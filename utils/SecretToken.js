const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.createSecretToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      first_name: user.first_name,
      role: user.role,
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "1h" }
  );
};
