const { StatusCodes } = require("http-status-codes");
const { UserServices } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { ServerConfig } = require("../config");

async function register(req, res) {
  try {
    //Code Logic

    /* Call the Service for User Registration */
    const { user, JWT_Token } = await UserServices.register({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      headers: req.headers,
    });

    /*  Once the call is successfull like User Registration has completed customise the user data and 
    send back to client via res object and also set the JWT Token inside res cookie */
    const { _id, name, email, phone, bio, photo, role, isVerified, userAgent } =
      user;
    SuccessResponse.data = {
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      isVerified,
      role,
      userAgent,
      JWT_Token,
    };
    SuccessResponse.message = "User registration Successful";

    res.status(StatusCodes.OK);
    res.json(SuccessResponse);
    res.cookie("token", JWT_Token, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none",
      expiresIn: ServerConfig.JWT_EXPIRY,
    });
    return res;
  } catch (error) {
    console.log("Error Occurred during User Registration:", error);
    ErrorResponse.message = error.explanation;
    ErrorResponse.data = error;
    ErrorResponse.stack =
      ServerConfig.NODE_ENV === "development" ? error.stack : null;

    return res
      .status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function signIn(req, res) {
  try {
    //Code Logic

    /* Call the Service for User Registration */
    const { user, JWT_Token } = await UserServices.signIn({
      email: req.body.email,
      password: req.body.password,
      headers: req.headers,
    });

    /*  Once the call is successfull like User Registration has completed customise the user data and 
    send back to client via res object and also set the JWT Token inside res cookie */
    const { _id, name, email, phone, bio, photo, role, isVerified, userAgent } =
      user;
    SuccessResponse.data = {
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      isVerified,
      role,
      userAgent,
      JWT_Token,
    };
    SuccessResponse.message = "User Login Successful";

    res
      .status(StatusCodes.OK)
      .cookie("token", JWT_Token, {
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "none",
        expiresIn: ServerConfig.JWT_EXPIRY,
      })
      .json(SuccessResponse);
    return res;
  } catch (error) {
    console.log("Error Occurred during User Login:", error);
    ErrorResponse.message = error.explanation;
    ErrorResponse.data = error;
    ErrorResponse.stack =
      ServerConfig.NODE_ENV === "development" ? error.stack : null;

    return res
      .status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function signOut(req, res) {
  try {
    //Code Logic

    /*  Once the call is successfull like User Registration has completed customise the user data and 
    send back to client via res object and also set the JWT Token inside res cookie */

    SuccessResponse.data = {
      JWT_Token: "",
    };
    SuccessResponse.message = "User Logout Successful";

    res.status(StatusCodes.OK);
    res.cookie("token", "", {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none",
      expiresIn: ServerConfig.JWT_EXPIRY,
    });
    res.json(SuccessResponse);
    return res;
  } catch (error) {
    console.log("Error Occurred during User Logout:", error);
    ErrorResponse.message = error.explanation;
    ErrorResponse.data = error;
    ErrorResponse.stack =
      ServerConfig.NODE_ENV === "development" ? error.stack : null;

    return res
      .status(error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports = {
  register,
  signIn,
  signOut,
};
