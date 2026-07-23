const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { registerUser, loginUser, logoutUser, forgotPasswordUser, resetPasswordUser } = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authMiddleware, logoutUser);
router.post("/forgot-password", forgotPasswordUser);
router.post("/reset-password", resetPasswordUser);

module.exports = router;
