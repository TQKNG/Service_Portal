const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.encrypt = async (password) => {
  // Encrypt password

  const salt = await bcrypt.genSalt(10);

  const p = await bcrypt.hash(password, salt);

  return p;
};

/*exports.encryptEmail = async (email) => {
  // Encrypt Email
  const p = await bcrypt.hash(email, process.env.EMAIL_SEED);

  return p;
};*/

exports.matchPassword = async (password, enteredPassword) => {
  return await bcrypt.compare(enteredPassword, password);
};

exports.generateResetToken = () => {
  //Generate token
  let resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set expire
  var date = new Date(Date.now() + 10 * 60 * 10000);
  const resetTokenExpire = date.toISOString();

  return { resetToken, resetTokenExpire };
};

exports.generateSignedJWT = (user) => {
  return jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
