const bcrypt = require("bcryptjs");
const sql = require("mssql");
const sendEmail = require("../utils/sendEmail");
const { poolPromise } = require("../config/db");
const {
  generateSignedJWT,
  generateResetToken,
  encrypt,
} = require("../utils/auth");

// @route   POST /api/auth/login
// @desc    Login User
// @access  public

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login to API service
 *     description: Login to get access token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully Login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *     security:
 *       - apiKeyAuth: []
 */

exports.login = async (req, res) => {
  try {
    console.log(req.body.email);
    // Robot Service Authentication Tempo
    if (req.body.email === "robot1@globaldws.com") {
      let user ={
        UserID: 1,
        FirstName: "Robot",
        LastName: "Service",
        Email: "robot1@globaldws.com"
      }
      sendTokenResponse(user, 200, res);
    }

    // Normal User Authentication
    const pool = await poolPromise;
    let results = await pool
      .request()
      .input("UserID", sql.Int, -1)
      .input("SchoolID", sql.Int, -1)
      .input("UserTypeID", sql.Int, -1)
      .input("Email", sql.VarChar(250), req.body.email)
      .input("schoolIds", sql.VarChar(sql.Max), -1)
      .execute("Main.Users_Load");

    console.log(await encrypt(req.body.email));

    let user = results.recordset[0];

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ message: "User doesn't exist" }] });
    }

    if (user.UserTypeID === 2) {
      return res
        .status(400)
        .json({ errors: [{ message: "User not Authorized" }] });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.Password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ message: "Invalid Credentials" }] });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.getCurrentUser = (req, res) => {
  try {
    res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   GET /api/auth/logout
// @desc    Check if auth
// @access  public
exports.checkAuth = (req, res) => {
  if (req.user) {
    res.status(200).json({ success: true, data: true });
  } else {
    res.status(500).json({ success: false, data: false });
  }
};

// @route   GET /api/auth/logout
// @desc    Logout User
// @access  public
exports.logout = (req, res) => {
  // deleting the cookie and token
  res.cookie("token", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
  });
};

// @route POST /api/auth/reset
// @desc Send Reset Password Link to Email
// @access Public
exports.resetPasswordEmail = async (req, res) => {
  try {
    const pool = await poolPromise;
    let results = await pool
      .request()
      .input("UserID", sql.Int, -1)
      .input("SchoolID", sql.Int, -1)
      .input("UserTypeID", sql.Int, -1)
      .input("Email", sql.VarChar(250), req.body.email)
      .input("schoolIds", sql.VarChar(sql.Max), -1)
      .execute("Main.Users_Load");

    const user = results.recordset[0];
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ message: "User does not exist" }] });
    }
    // Get reset token
    const tokens = generateResetToken();

    await pool
      .request()
      .input("UserID", sql.Int, user.UserID)
      .input("FirstName", sql.VarChar(250), user.FirstName)
      .input("LastName", sql.VarChar(250), user.LastName)
      .input("SchoolID", sql.Int, user.SchoolID)
      .input("UserTypeID", sql.Int, user.UserTypeID)
      .input("Email", sql.VarChar(250), user.Email)
      .input("AlternativeID", sql.VarChar(sql.MAX), user.AlternativeID)
      .input("ResetToken", sql.VarChar(250), tokens.resetToken)
      .input("ResetTokenExpire", sql.SmallDateTime, tokens.resetTokenExpire)
      .execute("Main.Users_Update");

    // Create reset URL
    const resetUrl = `https://radev.azurewebsites.net/account/reset/${tokens.resetToken}`;

    console.log(resetUrl);

    const message = `To reset your password click on this link : \n\n ${resetUrl}`;

    await sendEmail({
      email: user.Email,
      subject: "Reset Password",
      message,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @route   GET /api/auth/reset/:token
// @desc    Reset Password using token
// @access  public
exports.resetPassword = async (req, res) => {
  try {
    const pool = await poolPromise;

    // Get hashed token
    const resetToken = req.params.token;

    const resetTokenExpire = await pool
      .request()
      .input("ResetToken", sql.VarChar(250), resetToken)
      .execute("Main.Users_GetRestTokenExpire");

    const d = new Date(resetTokenExpire.recordset[0]);
    if (Date.now() > d) {
      return res.status(400).json({ errors: [{ message: "Token expired" }] });
    }

    // encrpyt password
    const password = await encrypt(req.body.password);

    // update
    await pool
      .request()
      .input("ResetToken", sql.VarChar(250), resetToken)
      .input("Password", sql.VarChar(250), password)
      .execute("Main.Users_ResetPassword");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Generate token from user model, create cookie and send a response
const sendTokenResponse = (user, statusCode, res) => {
  // Create a token
  const token = generateSignedJWT(user);

  const options = {
    expires: new Date(Date.now() + Number(process.env.JWT_EXPIRE)),
    httpOnly: true,
    sameSite: "strict",
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  // Response for API robot Service
  if (user.UserEmail === ("robot1@globaldws.com")) {
    res.status(statusCode).json({ success: true, token });
  } else {
    res
      .status(statusCode)
      .cookie("token", token, options)
      .json({ success: true, token });
  }
};
