const asyncHandler = require('./async');
const sql = require('mssql');
const jwt = require('jsonwebtoken');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } //Check cookies using cookie-parser middleware
  else if (req.cookies.token) {
    token = req.cookies.token;
  }
  // Make sure token exists
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'Not authorized to access this route' }] });
  }

  try {
    // Verify token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let config = {
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      server: process.env.SQL_SERVER,
      database: process.env.SQL_DATABASE,
      options: {
        encrypt: true,
      },
    };
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input('UserID', sql.Int, decoded.userId)
      .input('schoolID', sql.Int, -1)
      .input('UserTypeID', sql.Int, -1)
      .input('Email', sql.VarChar(250), -1)
      .input('schoolIds',sql.VarChar(sql.Max),-1)
      .execute('Main.Users_Load');

    user = user.recordset[0];

    if (user.UserTypeID === 1) {
      let classrooms = await pool
        .request()
        .input(
          'ClassroomID',
          sql.Int,
          req.body.ClassroomID !== undefined ? req.body.ClassroomID : -1,
        )
        .execute('Main.Classrooms_Load');

      classrooms = classrooms.recordset.filter(
        (item) => item.TeacherID === user.UserID,
      );
      console.log(classrooms);
      let students = [];
      for (let i = 0; i < classrooms.length; i++) {
        console.log(classrooms[i].GradeID);
        let s = await pool
          .request()
          .input('ClassroomID', sql.Int, classrooms[i].ClassroomID)
          .input('StudentID', sql.Int, -1)
          .execute('Main.ClassroomStudents_Load');

        for (let j = 0; j < s.recordset.length; j++) {
          s.recordset[j] = {
            ...s.recordset[j],
            Grade: classrooms[i].Grade,
          };
        }

        students = [...students, ...s.recordset];
      }
      students = [...new Map(students.map((v) => [v.StudentID, v])).values()];

      user = { ...user, Students: students };
    }

    req.user = user;

    delete req.user.Password;

    next();
  } catch (error) {
    console.log(error);
    if (error.name === 'TokenExpiredError') {
      res.cookie('token', '', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });
      return res.status(401).json({ errors: [{ msg: 'Session Expired' }] });
    } else {
      return res
        .status(401)
        .json({ errors: [{ msg: 'Not authorized to access this route' }] });
    }
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.UserTypeID)) {
      return res.status(403).json({
        errors: [
          {
            msg: `User role ${req.user.UserType} is not authorized to access this route`,
          },
        ],
      });
    }
    next();
  };
};
