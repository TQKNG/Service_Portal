const sql = require("mssql");
const { poolPromise } = require("../config/db");
const { encrypt, encryptEmail } = require("../utils/auth");

// @route   POST /api/user
// @desc    Add User
// @access  public
exports.addUser = async (req, res) => {
  try {
    if (
      req.user.UserTypeID <= req.body.userTypeId &&
      req.user.UserTypeID !== 5
    ) {
      return res.status(403).json({ errors: [{ message: "Not Authorized" }] });
    }
    // encrpyt password
    const password = await encrypt(req.body.Password);

    const pool = await poolPromise;
    let user = await pool
      .request()
      .input("UserID", sql.Int, -1)
      .input("schoolID", sql.Int, -1)
      .input("UserTypeID", sql.Int, -1)
      .input("Email", sql.VarChar(250), req.body.Email)
      .input("SchoolIds", sql.VarChar(sql.Max), req.body.Schools)
      .execute("Main.Users_Load");
    if (user.recordset.length > 0) {
      return res.status(400).json({ errors: [{ message: "Email is taken" }] });
    }

    let results = await pool
      .request()
      .input("FirstName", sql.VarChar(250), req.body.FirstName)
      .input("LastName", sql.VarChar(250), req.body.LastName)
      .input(
        "SchoolID",
        sql.Int,
        req.body.SchoolID !== undefined &&
          req.body.SchoolID !== "" &&
          parseInt(req.body.UserTypeID) !== 6 &&
          parseInt(req.body.UserTypeID) !== 5
          ? req.body.SchoolID
          : null
      )
      .input(
        "SchoolIds",
        req.body.Schools !== undefined && parseInt(req.body.UserTypeID) === 6
          ? req.body.Schools
          : null
      )
      .input("Email", sql.VarChar(250), req.body.Email)
      .input("UserTypeID", sql.Int, req.body.UserTypeID)
      .input("Password", sql.VarChar(250), password)
      .input(
        "AlternativeID",
        sql.VarChar(sql.MAX),
        req.body.AlternativeID !== undefined && req.body.AlternativeID !== ""
          ? req.body.AlternativeID
          : null
      )
      .input(
        "ResetToken",
        sql.VarChar(250),
        req.body.resetToken !== undefined ? req.body.resetToken : null
      )
      .execute("Main.Users_Insert");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   POST /api/user
// @desc    Add User
// @access  public
exports.addMultipleUsers = async (req, res) => {
  try {
    let duplicate = false;
    const pool = await poolPromise;
    let arr = req.body.users;
    for (let i = 0; i < arr.length; i++) {
      let u = arr[i];
      if (req.user.UserTypeID <= u.userTypeId && req.user.UserTypeID !== 4) {
        return res
          .status(403)
          .json({ errors: [{ message: "Not Authorized" }] });
      }
      // encrpyt password
      console.log(u.Password);
      const password = await encrypt(u.Password);

      let user = await pool
        .request()
        .input("UserID", sql.Int, -1)
        .input("schoolID", sql.Int, -1)
        .input("UserTypeID", sql.Int, -1)
        .input("Email", sql.VarChar(250), u.Email)
        .input("SchoolIds", sql.VarChar(sql.Max), -1)
        .execute("Main.Users_Load");
      if (user.recordset.length > 0) {
        duplicate = true;
        break;
      }

      let results = await pool
        .request()
        .input("FirstName", sql.VarChar(250), u.FirstName)
        .input("LastName", sql.VarChar(250), u.LastName)
        .input(
          "SchoolID",
          sql.Int,
          u.SchoolID !== undefined && u.SchoolID !== "" ? u.SchoolID : null
        )
        .input(
          "SchoolIds",
          sql.VarChar(sql.Max),
          req.body.Schools !== undefined ? req.body.Schools : -1
        )
        .input("Email", sql.VarChar(250), u.Email)
        .input("UserTypeID", sql.Int, u.UserTypeID)
        .input("Password", sql.VarChar(250), password)
        .input(
          "AlternativeID",
          sql.VarChar(sql.MAX),
          u.AlternativeID !== undefined && u.AlternativeID !== ""
            ? u.AlternativeID
            : null
        )
        .input(
          "ResetToken",
          sql.VarChar(250),
          u.resetToken !== undefined ? u.resetToken : null
        )
        .execute("Main.Users_Insert");
    }

    if (duplicate) {
      return res.status(400).json({ errors: [{ message: "Email is taken" }] });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
// @route   GET /api/user
// @desc    get Users
// @access  public
exports.getUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    let results = await pool
      .request()
      .input(
        "UserID",
        sql.Int,
        req.body.UserID !== undefined ? req.body.UserID : -1
      )
      .input(
        "SchoolID",
        sql.Int,
        req.user.UserTypeID !== 5 && req.user.UserTypeID !== 6
          ? req.user.SchoolID
          : -1
      )
      .input(
        "UserTypeID",
        sql.Int,
        req.body.UserTypeID !== undefined ? req.body.UserTypeID : -1
      )
      .input(
        "Email",
        sql.VarChar(250),
        req.body.Email !== undefined ? req.body.Email : -1
      )
      .input(
        "schoolIds",
        sql.VarChar(sql.Max),
        req.body.schoolIds !== undefined ? req.body.Schools : -1
      )
      .execute("Main.Users_Load");

    let result = results.recordset;

    if (req.user.UserTypeID < 3) {
      result.forEach((user) => {
        delete user.Password;
      });
    } else if (req.user.UserTypeID === 6) {
      if (req.body.schoolIds === undefined) {
       console.log(result)
      }
      else{
        let schools = JSON.parse("[" + req.body.schoolIds + "]");

        result = result.filter((user) => {
          return schools.includes(user.SchoolID);
        });
      }
      
     
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   GET /api/user/:userId
// @desc    update User
// @access  public
exports.editUser = async (req, res) => {
  try {
    if (
      req.user.UserTypeID <= req.body.userTypeId &&
      req.user.UserTypeID !== 5
    ) {
      return res.status(403).json({ errors: [{ message: "Not Authorized" }] });
    }
    console.log(req.body);
    const pool = await poolPromise;
    let results = await pool
      .request()
      .input("UserID", sql.Int, req.params.userId)
      .input("FirstName", sql.VarChar(250), req.body.FirstName)
      .input("LastName", sql.VarChar(250), req.body.LastName)
      .input(
        "SchoolID",
        sql.Int,
        req.body.SchoolID !== undefined &&
          req.body.SchoolID !== "" &&
          parseInt(req.body.UserTypeID) !== 6 &&
          parseInt(req.body.UserTypeID) !== 5
          ? req.body.SchoolID
          : null
      )
      .input(
        "schoolIds",
        sql.VarChar(sql.MAX),
        req.body.Schools !== undefined && parseInt(req.body.UserTypeID) === 6
          ? req.body.Schools
          : null
      )
      .input("UserTypeID", sql.Int, req.body.UserTypeID)
      .input("Email", sql.VarChar(250), req.body.Email)
      .input(
        "AlternativeID",
        sql.VarChar(sql.MAX),
        req.body.AlternativeID !== undefined && req.body.AlternativeID !== ""
          ? req.body.AlternativeID
          : null
      )
      .input("ResetToken", sql.VarChar(250), null)
      .input("ResetTokenExpire", sql.SmallDateTime, null)
      .execute("Main.Users_Update");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   GET /api/user/:userId
// @desc    delete User
// @access  public
exports.deleteUser = async (req, res) => {
  try {
    if (
      req.user.UserTypeID <= req.body.userTypeId &&
      req.user.UserTypeID !== 5
    ) {
      return res.status(403).json({ errors: [{ message: "Not Authorized" }] });
    }
    const pool = await poolPromise;
    let results = await pool
      .request()
      .input("UserID", sql.Int, req.params.userId)
      .execute("Main.Users_Delete");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
