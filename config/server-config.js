const env = require("dotenv");
env.config();

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  MONGO_URI: process.env.MONGO_URI,
  OUTLOOK_HOST: process.env.OUTLOOK_HOST,
  OUTLOOK_USER: process.env.OUTLOOK_USER,
  OUTLOOK_PASS: process.env.OUTLOOK_PASS,
  SUBJECT: process.env.SUBJECT,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
