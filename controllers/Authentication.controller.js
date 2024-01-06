const AuthModel = require("../Models/Auth.model");
const AuthRouter = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

/**
 * METHOD - POST
 * This method helps us to Create a new user account
 */
AuthRouter.post("/create", (req, res, next) => {
  if (req.body.password) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      if (hash) {
        // Create a new user via Authmodel
        const NEW_USER = new AuthModel({ ...req.body, password: hash });
        // Store the user in the database
        NEW_USER.save()
          .then((response) => {
            if (response._id) {
              return res.status(200).json({
                success: true,
                message: "Account created successfully",
              });
            } else {
              return res.status(200).json({
                success: true,
                message: "Something went wrong",
                error: err,
              });
            }
          })
          .catch((error) =>
            res.status(200).json({
              success: false,
              error: error,
            })
          );
      } else {
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
    });
  }
});

/**
 * METHOD = POST
 * Helps to signin user
 */
AuthRouter.post("/signin", async (req, res, next) => {
  // console.log(req.body);

  /**
   * Get the data from request object
   * Check whether given email or phone number is available in the database
   * If account is available then store the account data temporarily in the variable
   * If user account is not in the database, then respond user accordingly
   * Check for the password equality and response accordingly
   */
  const { email, phoneNumber, password } = req.body;
  let query = {};

  if (email) {
    query = {
      email: email,
    };
  }

  if (phoneNumber) {
    query = {
      ...query,
      phoneNumber: phoneNumber,
    };
  }

  try {
    const response = await AuthModel.findOne(query);
    if (response && response._id) {
      bcrypt.compare(password, response.password).then(function (result) {
        if (result) {
          res.status(200).json({
            success: true,
            message: "Account sign in successful",
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Email ID or Phone Number or Password is wrong",
          });
        }
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Account does not exists",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
});

/**
 * METHOD - GET
 * Helps to list down all the users
 */
AuthRouter.get("/list", (req, res, next) => {
  AuthModel.find()
    .then((response) => {
      if (response.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Users fetched successfully",
          data: response,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "No users found!",
          data: [],
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        error: error,
      });
    });
});

module.exports = AuthRouter;
