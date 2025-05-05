const User = require("../models/UserModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        
        const user = await User.create({ first_name, last_name, email, password, role });
        const token = createSecretToken(user);
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(201).json({ message: "User Signed Up Successfully", success: true, user });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All Fields Are Required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        const token = createSecretToken(user);
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({ message: "User Logged In Successfully", success: true, role: user.role });
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports.Logout = (req, res) => {
    res.cookie("token", "", { maxAge: 1 }); // Clear the cookie
    res.status(200).json({ message: "Logged out successfully", success: true });
};


