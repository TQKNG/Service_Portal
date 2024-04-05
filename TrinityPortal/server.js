const express = require('express');
const http = require('http'); 
const {initWebSocket} = require('./utils/webSocketUtils');

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

const passport = require('passport');

// ENVIROMENT VARIABLES
dotenv.config({ path: './config/config.env' });

// Init Express App
const app = express();
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

//Routes
const user = require('./routes/User');
const school = require('./routes/School');
const auth = require('./routes/Auth');
const assessments = require('./routes/Assessment');
const assessmentresults = require('./routes/AssessmentResult');
const classrooms = require('./routes/Classroom');
const receptions = require('./routes/Reception');
const songs = require('./routes/Song');
const books = require('./routes/Book');
const jokes = require('./routes/Joke');
const trivias = require('./routes/Trivia');

//Routes for other robot services
const robotservice = require('./routes/RobotService')

//Mount Routes
app.use('/api/users', user);
app.use('/api/schools', school);
app.use('/api/assessments', assessments);
app.use('/api/auth', auth);
app.use('/api/assessmentresults', assessmentresults);
app.use('/api/classrooms', classrooms);
app.use('/api/receptions', receptions);
app.use('/api/songs', songs);
app.use('/api/books', books);
app.use('/api/jokes', jokes);
app.use('/api/trivias', trivias);
app.use('/api/robotservices',robotservice);


// Serve API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification, options));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(openapiSpecification);
});


app.use('/assets/SongLogo', express.static(path.join(__dirname, 'assets/SongLogo')));

app.use('/assets/SongAudio', express.static(path.join(__dirname, 'assets/SongAudio')));

// Serve Static assests Static
app.use(express.static(__dirname + '/client/build'));



app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Create a websocket server
initWebSocket(server);

// Attach WebSocket server to existing HTTP server
server.listen(process.env.PORT ||5000, () => {
  console.log(`Server running on port ${server.address().port}`);
});





