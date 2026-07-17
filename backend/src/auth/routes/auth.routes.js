const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { registerUser, loginUser, logoutUser } = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authMiddleware,logoutUser);

module.exports = router;
