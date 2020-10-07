const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("Bearer");

  if (!token) return res.status(401).json("Unauthorized access denied");

  try {
    const getToken = jwt.verify(token, config.get("secret"));
    req.user = getToken.user;

    next();
  } catch (error) {
    res.status(500).json("Token Error");
  }
};
