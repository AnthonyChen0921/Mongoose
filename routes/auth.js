/* 
    The File is used to handle all the authentication routes.
    Controller methods are stored in the ../controllers/auth.js file.
*/

const express = require("express");
const { check, body } = require("express-validator");
const User = require("../models/user");

const authController = require("../controllers/auth");

const router = express.Router();

// auth/login
// GET to the login page
router.get("/login", authController.getLogin);
// POST to the login page
router.post("/login", authController.postLogin);

// auth/logout
router.post("/logout", authController.postLogout);

// auth/signup
// GET to the signup page
router.get("/signup", authController.getSignup);
// POST to the signup page
router.post(
  "/signup",
  [
    check("email").isEmail().withMessage("Please enter a valid email")
    .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
                return Promise.reject("E-mail address already exists");
            }
        });
    }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Please enter a password of at least 6 characters")
      .isAlphanumeric()
      .withMessage("Please enter a password with only letters and numbers"),
    body("confirmPassword")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }).withMessage("Passwords do not match")
  ],
  authController.postSignup
);

// auth/reset
// GET to the reset page
router.get("/reset", authController.getReset);
// POST to the reset page
router.post("/reset", authController.postReset);
// GET to the reset/:token page
// This route is used to reset the password for a user given a password reset token sent to their email address.
// The token is only valid for 24 hours.
router.get("/reset/:token", authController.getNewPassword);

// POST the new password to the reset/:token page
router.post("/new-password", authController.postNewPassword);

module.exports = router;
