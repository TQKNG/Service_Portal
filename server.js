const express = require('express');
const http = require('http'); 
const {initWebSocket} = require('./utils/webSocketUtils');
const googleAuth = require('./utils/googleAuth');
const { GoogleAuth } = require('google-auth-library');
const passport = require('passport');

// Utils
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Security
const helmet = require('helmet');
const hpp = require('hpp');
const xss = require('xss-clean');


// ENVIROMENT VARIABLES
dotenv.config({ path: './config/config.env' });

// Init Express App
const app = express();
const session = require('express-session');
const server = http.createServer(app);

// Body Parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API Documentation
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Trinity Portal API',
      version: '1.0.0',
      description: 'API for Robot Services',
    },
  },
  apis: ['./controllers/*.js'],
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Trinity API Documentation",
  customfavIcon: "/assets/logo.png",
};


const openapiSpecification = swaggerJsdoc(options);

// ---------- Utils ----------
// Use Morgan to log reqs

app.use(morgan('dev'));

// compress all responses
app.use(compression());

// ---------- Security ----------

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Set security header
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

// Enable CORS
// app.use(
//   cors({
//     origin: 'https://ra2.azurewebsites.net',
//     // origin: 'https://radev.azurewebsites.net', // Old one
//     credentials: true,
//   }),
// );
app.use(cors());

// no cache
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache , no-store , must-revalidate');
  next();
});

// suppress x-powered-by headers
app.disable('x-powered-by');

// initialize cookieParser middleware
app.use(cookieParser());

// Session Management
app.use(session({
  secret: 'abc123',
  resave: false,
  saveUninitialized: false,
}));

//Routes
const user = require('./routes/User');
const auth = require('./routes/Auth');
const receptions = require('./routes/Reception');
const songs = require('./routes/Song');
const books = require('./routes/Book');
const jokes = require('./routes/Joke');
const trivias = require('./routes/Trivia');
const settings = require('./routes/Setting');
const schedules = require('./routes/Schedule');

//Routes for other robot services
const robotservice = require('./routes/RobotService');
const { OauthProtect } = require('./middleware/auth');

//Mount Routes
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/receptions', receptions);
app.use('/api/songs', songs);
app.use('/api/books', books);
app.use('/api/jokes', jokes);
app.use('/api/trivias', trivias);
app.use('/api/settings', settings);
app.use('/api/schedules', schedules);
app.use('/api/robotservices',robotservice);


// Serve API Docs
app.use('/api-docs', OauthProtect, swaggerUi.serve, swaggerUi.setup(openapiSpecification, options));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(openapiSpecification);
});

// Direct route to access Song Logo and Song Audio
app.use('/assets/SongLogo', express.static(path.join(__dirname, 'assets/SongLogo')));

app.use('/assets/SongAudio', express.static(path.join(__dirname, 'assets/SongAudio')));

app.use('/assets/BookCover', express.static(path.join(__dirname, 'assets/BookCover')));

app.use('/assets/BookLastPage', express.static(path.join(__dirname, 'assets/BookLastPage')));

app.use('/assets/JokeLogo', express.static(path.join(__dirname, 'assets/JokeLogo')));

// Serve Static assests Static
app.use(express.static(__dirname + '/client/build'));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.redirect('/robotAuth');
});

// Define a custom middleware to authenticate the robot
const authenticateRobot = async (req, res, next) => {
  const keyFilePath = path.join(__dirname, 'assets', 'trinityvillage-942dc8d92cc0.json');

  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
  });

  try {
    const client = await auth.getClient();
    console.log("trest client",client);
    const token = await client.getAccessToken(); // get a JWT

    console.log("trest token",token);
    req.authToken = token.token; // attach the JWT to the request
    next(); // proceed to the next middleware function or route handler
  } catch (err) {
    console.log("Test error",err);
    res.status(401).json({ message: 'Authentication failed for the robot' });
  }
};
  

app.get('/robotAuth', passport.authenticate('google', { scope: ['email','profile'] }));


app.get('/robotAuth2', authenticateRobot,(req, res) => {
   res.json({ message: 'Authentication successful for the robot', token:req.authToken });
})

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.save((err) => {
      // After saving the session, redirect to /api-docs
      res.redirect('/api-docs');
    });
  });

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Create a websocket server
initWebSocket(server);

// Attach WebSocket server to existing HTTP server
server.listen(process.env.PORT ||5001, () => {
  console.log(`Server running on port ${server.address().port}`);
});





