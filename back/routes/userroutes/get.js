var userscontroller = require("../../controllers/users.controllers");
var authmidllwares = require("../../midllwares/auth/authmidllwares");

const initalizeposteroute = (app) => {
  app.get("/users/getuser", [authmidllwares, userscontroller.getbyId]);
  app.get("/users/getpost", [authmidllwares, userscontroller.getuserpost]);
};
module.exports = initalizeposteroute;
