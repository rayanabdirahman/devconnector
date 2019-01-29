/**********************************************
 * Connect to MongoDB via mongoose
 **********************************************/

const mongoose = require("mongoose");
const MONGO_URI = require("../config/keys").MONGO_URI;

const MONGOOSE_CONNECT = mongoose
  .connect(
    MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Success! MongoDB Connected`))
  .catch(err => console.log(`Failed to connect to MongoDB: ${err}`));

// export consts
module.exports.MONGOOSE_CONNECT = MONGOOSE_CONNECT;
