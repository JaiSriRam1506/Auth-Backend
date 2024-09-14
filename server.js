const express = require("express"); //Machine purchase kiya bazar se
const cookieParser = require("cookie-parser");
const apiRoutes = require("./routes");
const { ServerConfig, ConnectMDB } = require("./config");
/* Important Import for Security Enhancement */
// import morgan from "morgan";
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const createHttpError = require("http-errors");

//Check the diff between require and import

const app = express(); // machine ko fit krke electricity diya

/* Read the Req input*/

app.use(express.json()); //text manual to read How the machine works?
app.use(express.urlencoded({ extended: true })); //Image Manual

app.use(cookieParser()); //to Parse the cookies

//Morgan
if (ServerConfig.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//Helmet
app.use(helmet());

//Sanitize Mongo DB
app.use(mongoSanitize());

//Cookie Parser
app.use(cookieParser());

//Zip
app.use(compression());

//Cors
app.use(cors());

/* Add More Middleware to Protect the server and data */

//req=Request{Server takes input from this object}, res=Response{server send any input/result from this object}

app.use("/api", apiRoutes);

//Route Doesn't found
app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This Route doesn't found"));
});

//Handle HTTP Errors
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

//jb washing machine start hojaye tb kpada dho lo
app.listen(ServerConfig.PORT, async (err) => {
  if (err) {
    console.log("Error has been occured:");
  }
  await ConnectMDB.connectMongoDB();
  console.log(`Server has started successfully in ${ServerConfig.PORT} port`);
});

// http://localhost:4000/api/v1/user/getInfo
// http://localhost:4000/api/v1/user/register
// http://localhost:4000/api/v1/user/login
// http://localhost:4000/api/v1/user/logout
// http://localhost:4000/api/v1/product/getProduct

//   Adding Morgan middleware as an HTTP request logger middleware for node js.

// - Add Helmet middleware, Helmet helps you secure your Express apps by setting various HTTP headers.

// - Adding Express json and urlencoded middleware to parse json request from body and url.

// - Adding Express-mongo-sanitize middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.

// - Adding Cookie-parser middleware to parse Cookie header and populate req.cookies with an object keyed by the cookie names.

// - Adding Compression middleware to compress response bodies for all request that traverse through the middleware.

// - Adding Express-fileupload middleware to make uploaded files accessible from req.files.

// - Adding cors middleware to protect and restrict access to the server.
