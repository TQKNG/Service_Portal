const express = require('express');

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

// Body Parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
app.use(
  cors({
    origin: 'https://ra2.azurewebsites.net',
    // origin: 'https://radev.azurewebsites.net', // Old one
    credentials: true,
  }),
);

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

//Mount Routes
app.use('/api/users', user);
app.use('/api/schools', school);
app.use('/api/assessments', assessments);
app.use('/api/auth', auth);
app.use('/api/assessmentresults', assessmentresults);
app.use('/api/classrooms', classrooms);

// Serve Static assests Static
app.use(express.static(__dirname + '/client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
