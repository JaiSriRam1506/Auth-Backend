const express = require("express"); //Machine purchase kiya bazar se
const cookieParser = require("cookie-parser");
const apiRoutes = require("./routes");
const { ServerConfig } = require("./config");
//Check the diff between require and import

const app = express(); // machine ko fit krke electricity diya

/* Read the Req input*/

app.use(express.json()); //text manual to read How the machine works?
app.use(express.urlencoded({ extended: true })); //Image Manual

app.use(cookieParser()); //to Parse the cookies

/* Add More Middleware to Protect the server and data */

//It is like a door
app.get("/getInfoData", (req, res) => {
  res.send(
    `Hello ${req.body.name} welcome to Backend Course, your email is ${req.body.email}, please report if incorrect email`
  );
});

//req=Request{Server takes input from this object}, res=Response{server send any input/result from this object}

app.use("/api", apiRoutes);

//jb washing machine start hojaye tb kpada dho lo
app.listen(ServerConfig.PORT, (err) => {
  if (err) {
    console.log("Error has been occured:", err);
  }
  console.log(`Server has started successfully in ${ServerConfig.PORT} port`);
});

// http://localhost:4000/api/v1/user/getInfo
// http://localhost:4000/api/v1/user/register
// http://localhost:4000/api/v1/user/login
// http://localhost:4000/api/v1/user/logout
// http://localhost:4000/api/v1/product/getProduct
