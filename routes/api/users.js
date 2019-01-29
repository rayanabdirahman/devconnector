/**********************************************
 * Router file to handle users api calls
 **********************************************/

const express = require("express");
const router = express.Router();

/**
 * @route GET api/users
 * @public
 */
router.get("/", (req, res) => res.json({ router: "user" }));

// export router
module.exports = router;
