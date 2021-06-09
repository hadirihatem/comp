var userscontroller = require("../../controllers/users.controllers");
var authmidllwares = require("../../midllwares/auth/authmidllwares");

const initializePutRoutes = (app) => {
  app.put("/users/:userId", [authmidllwares, userscontroller.update]);
};

module.exports = initializePutRoutes;
