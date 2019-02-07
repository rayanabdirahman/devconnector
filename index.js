/**********************************************
 * Application entry file
 **********************************************/

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const PORT = require("./constants").PORT;
const app = express();

// connect to database
require("./db-config/db").MONGOOSE_CONNECT;

// routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// use passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

// use body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// start express server
app.listen(PORT, console.log(`App running on PORT: ${PORT}`));
