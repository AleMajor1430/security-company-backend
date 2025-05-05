const express = require("express");
const { authMiddleware, checkRole } = require("../middlewares/AuthMiddleware");
const { Signup, Login, Logout } = require("../controllers/AuthController");

const auth = express.Router();

auth.post("/signup", Signup);
auth.post("/login", Login);
auth.post("/logout", Logout);

// Protected routes
// auth.get("/dashboard", authMiddleware, checkRole(["Admin"]), (req, res) => {
//     res.json({ message: "Welcome to Admin Dashboard" });
// });

auth.get("/dashboard", authMiddleware, checkRole(["Data-Officer", "Admin"]), (req, res) => {
    res.json({ status: true, user: req.user });
});

// auth.get("/dashboard/guards", authMiddleware, checkRole(["Owner", "Admin"]), (req, res) => {
//     res.json({ message: "Welcome to Owner Dashboard" });
// });

// auth.get("/guard-dashboard", authMiddleware, checkRole(["Guard"]), (req, res) => {
//     res.json({ message: "Welcome to Guard Dashboard" });
// });

module.exports = auth;
