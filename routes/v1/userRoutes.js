const express = require("express");
const { UserController } = require("../../controllers");

/* to send the req to proper controllers */

const router = express.Router();

router.post("/register", UserController.register);
router.post("/signIn", UserController.signIn);
router.post("/signOut", UserController.signOut);

module.exports = router;

//http://localhost:4000/api/v1/user/register
