const AuthRouter = require("express").Router();

/**
 * METHOD - POST
 * This method helps us to Create a new user account
 */
AuthRouter.post("/create", (req, res, next) => {
  console.log(req.body);
  return res.status(200).json({
    success: true,
  });
});

module.exports = AuthRouter;
