const express = require("express");
const { UserController } = require("../../controllers");

/* to send the req to proper controllers */

const router = express.Router();

router.post("/register", UserController.register);

module.exports = router;

//http://localhost:4000/api/v1/user/register
