require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
  // console.log("Cookies received:", req.cookies); // Debugging cookie
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: "Unauthorized Access" });
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    // console.log("Decoded User:", decoded); // Debugging user data
    req.user = decoded;
    next();
  });
};

module.exports.checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You don't have permission" });
    }
    next();
  };
};
