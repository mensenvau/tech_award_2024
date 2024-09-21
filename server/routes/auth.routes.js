const { verifyPhoneCode, authSignIn, authSignUp } = require("../controllers/auth.js");
const { body } = require("uzdev/joi");
const UserSchema = require('../models/user.js');

module.exports = function (app) {
    app.post("/api/auth/signup", body(UserSchema), authSignUp);
    app.post("/api/auth/signin", body(UserSchema), authSignIn);
    app.post("/api/auth/verify", verifyPhoneCode)
};
