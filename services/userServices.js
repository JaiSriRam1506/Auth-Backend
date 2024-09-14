const AppError = require("../utils/error/app-error");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");
const parser = require("ua-parser-js");
const { AUTH } = require("../utils/common");

async function register({ name, email, password, headers }) {
  try {
    //Code Logic

    /* User Data level:- Validating Input Data which is coming from Client{Frontend, PostMan etc} */
    if (!name || !email || !password) {
      throw new AppError(
        "One of the field is missing, Please check",
        StatusCodes.BAD_REQUEST
      );
    }

    if (password.length < 6) {
      throw new AppError(
        "Please provide atleast 6 character passoword",
        StatusCodes.BAD_REQUEST
      );
    }
    //Email Validation and much more Validation

    /* Database Level Validation */
    const userFound = await User.findOne({ email });
    if (userFound)
      throw new AppError(
        "User Already exists, Please login",
        StatusCodes.BAD_REQUEST
      );

    const ua = parser(headers["user-agent"]);
    const user = await User.create({
      name,
      email,
      password,
      userAgent: [ua.ua],
    });

    if (!user)
      throw new AppError(
        "User registration is failed , Please try again",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    const JWT_Token = await AUTH.createToken({ _id: user._id.toString() });
    if (!JWT_Token)
      throw new AppError(
        "Unable to create JWT Token",
        StatusCodes.INTERNAL_SERVER_ERROR
      );

    return { user, JWT_Token };
  } catch (error) {
    console.log("User Registration has been failed due to:", error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Unable to Process User Registration:" + error,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signIn({ email, password, headers }) {
  try {
    //Code Logic

    /* User Data level:- Validating Input Data which is coming from Client{Frontend, PostMan etc} */
    if (!email || !password) {
      throw new AppError(
        "One of the field is missing, Please check",
        StatusCodes.BAD_REQUEST
      );
    }

    if (password.length < 6) {
      throw new AppError(
        "Please provide atleast 6 character passoword",
        StatusCodes.BAD_REQUEST
      );
    }
    //Email Validation and much more Validation

    /* Database Level Validation */
    const userFound = await User.findOne({ email });
    if (!userFound)
      throw new AppError(
        "User not found, Please register first",
        StatusCodes.BAD_REQUEST
      );

    const isValidPassword = await AUTH.checkPassword(
      password,
      userFound.password
    );
    if (!isValidPassword)
      throw new AppError(
        "Incorrect Password, Please try again with correct password",
        StatusCodes.BAD_REQUEST
      );
    const ua = parser(headers["user-agent"]);
    const currentAgent = ua.ua;

    const alreadyExists = userFound.userAgent.includes(currentAgent);
    if (!alreadyExists) {
      const deviceCount = userFound.userAgent.length;
      if (deviceCount >= 4) {
        throw new AppError(
          "You have been already logged into more than 4 device",
          StatusCodes.BAD_REQUEST
        );
      }
      userFound.userAgent.push(currentAgent);
      await userFound.save();
    }
    const JWT_Token = await AUTH.createToken({ _id: userFound._id.toString() });
    if (!JWT_Token)
      throw new AppError(
        "Unable to create JWT Token",
        StatusCodes.INTERNAL_SERVER_ERROR
      );

    return { user: userFound, JWT_Token };
  } catch (error) {
    console.log("User Login has been failed due to:", error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Unable to Process User Login:" + error,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  register,
  signIn,
};
