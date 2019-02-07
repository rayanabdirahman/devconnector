/**********************************************
 * Router file to handle users api calls
 **********************************************/

const express = require("express");
const router = express.Router();
const gravator = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// import user model
const USER_MODEL = require("../../models/User");

// import JWT Secret
const JWT_SECRET = require("../../config/keys").JWT_SECRET;

/**
 * @route POST api/users/register
 * @desc Register user
 * @public
 */
router.post("/register", (req, res) => {
  // form values from body parser
  const { name, email, password } = req.body;

  // find email that matches the registration email
  USER_MODEL.findOne({ email }).then(user => {
    /**
     * send error message if email is already assigned to a user
     * @param user - user in database
     */
    if (user) {
      return res.status(400).json({
        error: "Email already exists"
      });
    }

    // create avatar for new user
    const avatar = gravator.url(email, {
      s: 200, // size
      r: "pg", // rating
      default: "mm" // default
    });

    // create new user if email does not exist in database
    const NEW_USER = new USER_MODEL({
      name,
      email,
      avatar,
      password
    });

    // encrypt user password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(NEW_USER.password, salt, (err, hash) => {
        if (err) throw err;
        NEW_USER.password = hash;

        /**
         * save new user to database
         * send user object back as JSON
         */
        NEW_USER.save()
          .then(user => res.json(user))
          .catch(err =>
            console.log(`Error when saving user to database: ${err}`)
          );
      });
    });
  });
});

/**
 * @route POST api/users/login
 * @desc Login user // return JWT Token
 * @public
 */
router.post("/login", (req, res) => {
  // form values from body parser
  const { email, password } = req.body;

  // find user by email
  USER_MODEL.findOne({ email }).then(user => {
    // send error if user is not found
    if (!user) return res.status(400).json({ email: "User not found" });

    /**
     * check password by comparing bcrypt hash
     * @param password - form value passed in by user
     * @param user.password - user password stored in database
     */
    bcrypt.compare(password, user.password).then(isMatch => {
      // send an error if password does not match
      if (!isMatch)
        return res.status(400).json({ password: "Password is incorrect" });

      // 1. if passwords match get values from user object
      const { id, name, avatar } = user;

      // 2. create JWT payload with user values
      const payload = { id, name, avatar };

      // 3. sign JWT token with payload and secret key
      jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        // if error send error
        if (err) return res.json({ error: "Could not login with JWT token" });

        // return Bearer token
        return res.json({
          success: true,
          token: `Bearer ${token}`
        });
      });
    });
  });
});

// export router
module.exports = router;
