/**********************************************
 * Router file to handle users api calls
 **********************************************/

const express = require("express");
const router = express.Router();
const gravator = require("gravatar");
const bcrypt = require("bcryptjs");

// import user model
const USER_MODEL = require("../../models/User");

/**
 * @route GET api/users
 * @public
 */
router.get("/", (req, res) => res.json({ router: "user" }));

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

// export router
module.exports = router;
