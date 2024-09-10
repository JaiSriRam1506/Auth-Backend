const express = require("express");
const v1Routes = require("./v1");

const router = express.Router(); //router is insan to route the req to specific location

router.use("/v1", v1Routes);

module.exports = router; //Defualt export {named export}

// http://localhost:4000/api/v1/user/getInfo
// http://localhost:4000/api/v1/user/register
// http://localhost:4000/api/v1/user/login
// http://localhost:4000/api/v1/user/logout
// http://localhost:4000/api/v1/product/getProduct
