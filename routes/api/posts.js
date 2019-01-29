/**********************************************
 * Router file to handle posts api calls
 **********************************************/

const express = require("express");
const router = express.Router();

/**
 * @route GET api/posts
 * @public
 */
router.get("/", (req, res) => res.json({ router: "posts" }));

// export router
module.exports = router;
