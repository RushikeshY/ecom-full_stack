const express = require("express");
const { registerUser, loginUser } = require("../controller/userController");

const router = express.Router();

router.route("/sign-up").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
