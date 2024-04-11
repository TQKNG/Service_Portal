const asyncHandler = require("./async");
const sql = require("mssql");
const jwt = require("jsonwebtoken");
const { GoogleAuth, OAuth2Client } = require("google-auth-library");
const path = require("path");
const axios = require("axios");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    
    token = req.headers.authorization.split(" ")[1];
  } //Check cookies using cookie-parser middleware
  else if (req.cookies.token) {
    token = req.cookies.token;
  }
  // Make sure token exists
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "Not authorized to access this route" }] });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if(decoded.UserEmail === "robot1@globaldws.com"){
      next();
    }
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
      .input("UserID", sql.Int, decoded.userId)
      .input("schoolID", sql.Int, -1)
      .input("UserTypeID", sql.Int, -1)
      .input("Email", sql.VarChar(250), -1)
      .input("schoolIds", sql.VarChar(sql.Max), -1)
      .execute("Main.Users_Load");

    user = user.recordset[0];

    if (user.UserTypeID === 1) {
      let classrooms = await pool
        .request()
        .input(
          "ClassroomID",
          sql.Int,
          req.body.ClassroomID !== undefined ? req.body.ClassroomID : -1
        )
        .execute("Main.Classrooms_Load");

      classrooms = classrooms.recordset.filter(
        (item) => item.TeacherID === user.UserID
      );
      console.log(classrooms);
      let students = [];
      for (let i = 0; i < classrooms.length; i++) {
        console.log(classrooms[i].GradeID);
        let s = await pool
          .request()
          .input("ClassroomID", sql.Int, classrooms[i].ClassroomID)
          .input("StudentID", sql.Int, -1)
          .execute("Main.ClassroomStudents_Load");

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
    if (error.name === "TokenExpiredError") {
      res.cookie("token", "", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });
      return res.status(401).json({ errors: [{ msg: "Session Expired" }] });
    } else {
      return res
        .status(401)
        .json({ errors: [{ msg: "Not authorized to access this route" }] });
    }
  }
});

// Protect Google OAuth routes
exports.OauthProtect = asyncHandler(async (req, res, next) => {
  try {
    // For web browser, authenticate using session ID
    if (req.sessionID) {
      console.log("OauthProtect", req.sessionID);

      // Get the session associated with the session ID
      req.sessionStore.get(req.sessionID, function (error, session) {
        if (error) {
          // Handle error
          console.log("Error getting session:", error);
          res.status(500).send("Server error");
        } else {
          // Check if the session exists
          if (session) {
            console.log("Session found:", session);

            // Check if the session meets your validation criteria
            if (session.passport && session.passport.user) {
              // If the session is valid, call next()
              next();
            } else {
              // If the session is not valid, don't call next()
              console.log("Session user not found");
              res.status(401).send("Unauthorized");
            }
          } else {
            console.log("Session not found");
            res.status(401).redirect("/");
          }
        }
      });
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      console.log("test");
    } else {
      res.status(401).redirect("/");
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.cookie("token", "", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });
      return res.status(401).json({ errors: [{ msg: "Session Expired" }] });
    } else {
      return res
        .status(401)
        .json({ errors: [{ msg: "Not authorized to access this route" }] });
    }
  }
});

// Protect: Only robot registered can access the route
exports.GoogleAuthProtect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  try {
    const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`);

    // Check if the token is valid and intended for your client
    const aud = response.data.aud;
    if (aud !== "103234893535789449064") {
      return res.status(403).json({ error: "Invalid token" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: "Failed to authenticate token" });
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
