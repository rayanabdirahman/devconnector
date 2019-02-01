/**********************************************
 * JWT Passport Strategy for authentication
 **********************************************/

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const USER_MODEL = mongoose.model("users");
const JWT_SECRET = require("./keys").JWT_SECRET;

/**
 * @object JWT option config
 * @param {function} OPTIONS.jwtFromRequest - JWT extraction method
 * @param {string} OPTIONS.secretOrKey - JWT secret or key
 */
const OPTIONS = {};
OPTIONS.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
OPTIONS.secretOrKey = JWT_SECRET;

module.exports = passport => {
  passport.use(
    new JwtStrategy(OPTIONS, (payload, done) => {
      console.log(payload);
    })
  );
};
