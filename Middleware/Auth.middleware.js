const jwt = require("jsonwebtoken");

function AuthMiddleware(req, res, next) {
  const token = req.header("token");
  if (token) {
    try {
      var decoded = jwt.verify(token, "ECOM_API_SECRET");
      if (decoded) {
        next();
      }
    } catch (error) {
      return res.status(401).json({
        message: "Token expired. Login to continue!",
        error: error,
      });
    }
  } else {
    return res.status(200).json({
      message: "Login to your account",
    });
  }
}

module.exports = AuthMiddleware;
