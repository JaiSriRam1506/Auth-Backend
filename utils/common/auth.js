const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../../config");

function createToken(input) {
  try {
    const token = jwt.sign(input, ServerConfig.JWT_SECRET, {
      expiresIn: ServerConfig.JWT_EXPIRY,
    });
  } catch (error) {
    console.log("Error has been occurred while creating token:", error);
    throw error;
  }
}

function verifyToken(token) {
  try {
    return jwt.verify(token, ServerConfig.JWT_SECRET); //This will return boolean value either true or false
  } catch (error) {
    console.log("Unable top verify user:", error);
    throw error;
  }
}

function checkPassword(plainPassword, encryptedPassword) {
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (error) {
    console.log("Error has been occurred while comparing password:", error);
    throw error;
  }
}

module.exports = {
  createToken,
  verifyToken,
  checkPassword,
};
