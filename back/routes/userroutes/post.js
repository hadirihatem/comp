// var {valdateUserPostReq}=require('../../midllwares/validator/ex.validator');
var userscontroller = require("../../controllers/users.controllers");
var { validation } = require("../../midllwares/validator/validation");
const { body } = require("express-validator");
// var authmidllwares=require ('../../midllwares/auth/authmidllwares')

const initalizeposteroute = (app) => {
  app.post("/users/register", [
    body("firstname", "firstname must be alpha").isAlpha(),
    body("lastname", "lastname must be alpha").isAlpha(),
    body("phone", "phone must be numeric").isNumeric(),
    body("email", "invalid email").isEmail(),
    body("password", "minimum length allowed is 5 character").isLength({
      min: 5,
    }),
    validation,
    userscontroller.insert,
  ]);
  app.post("/users/login", [
    body("email", "please entre a valid email").isEmail(),
    body("password", "please write your PW").notEmpty(),
    validation,
    userscontroller.login,
  ]);
};
module.exports = initalizeposteroute;
