/**********************************************
 * Router file to handle profile api calls
 **********************************************/

const express = require("express");
const router = express.Router();

/**
 * @route GET api/profile
 * @public
 */
router.get("/", (req, res) => res.json({ router: "profile" }));

// export router
module.exports = router;
