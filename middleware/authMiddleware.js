const AppError = require("../utils/error/app-error");
const { StatusCodes } = require("http-status-codes");
const { AUTH } = require("../utils/common");
const User = require("../models/userModel");
const { ErrorResponse } = require("../utils/common");
const { ServerConfig } = require("../config");

async function checkAuthentication(req, res, next) {
  let TokenError;
  try {
    /* 1st step to check if Token is present or not */
    const token = req.cookies.token;
    if (!token) {
      throw new AppError(
        "Please provide access Token or login first",
        StatusCodes.BAD_REQUEST
      );
    }

    /* if Token is present then verify the token is correct whatever has been generated at the start */
    const isTokenExists = AUTH.verifyToken(token);
    TokenError = isTokenExists;

    if (!isTokenExists)
      throw new AppError(
        "Unable to authenticate to the server, please try again or token is invalid",
        StatusCodes.BAD_REQUEST
      );

    /* if token has verified and found correct token then 3rd step is to check in database if user is valid user or not */
    let user;
    if (isTokenExists)
      user = await User.findById(isTokenExists._id).select("-password");

    if (!user)
      throw new AppError(
        "User Doesn't found in Database",
        StatusCodes.NOT_FOUND
      );

    /* if User is valid user and found in database then check if the user is not suspended user */
    if (user.role === "suspended") {
      throw new AppError(
        "User has been suspended, Please contact to support team",
        StatusCodes.BAD_REQUEST
      );
    }

    /* All criteria has been passed here now let the user access the server resource whatever he/she is asking */
    if (token && isTokenExists && user) {
      req.user = user; // this is import line of code make sure you should understand whey we are setting user inside request because we can access this user later in another file
      next();
    }
  } catch (error) {
    console.log(
      "Error has been occurred during Checking Authentication Process:",
      error
    );
    ErrorResponse.message = error.explanation;
    ErrorResponse.error = error;
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    ErrorResponse.stack =
      ServerConfig.NODE_ENV === "development" ? error.stack : "";

    if (error.name === "JsonWebTokenError") {
      ErrorResponse.message = "Invalid JWT Token";
      statusCode = StatusCodes.UNAUTHORIZED;
    }
    if (error.name === "TokenExpiredError") {
      ErrorResponse.message = "JWT Token has been expired";
      statusCode = StatusCodes.UNAUTHORIZED;
    }
    return res.status(statusCode).json(ErrorResponse);
  }
}

module.exports = {
  checkAuthentication,
};
