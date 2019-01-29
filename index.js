/**********************************************
 * Application entry file
 **********************************************/

const express = require("express");
const PORT = require("./constants").PORT;
const app = express();

// connect to database
const MONGOOSE_CONNECT = require("./db-config/db").MONGOOSE_CONNECT;

app.get("/", (req, res) => res.json({ hello: "world" }));

// Start express server
app.listen(PORT, console.log(`App running on PORT: ${PORT}`));
