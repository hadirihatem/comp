var groupecontroller = require("../../controllers/groupe.controllers");
const authmidllwares = require("../../midllwares/auth/authmidllwares");

const initializePutRoutes = (app) => {
  app.put("/groupe/:groupeId", [authmidllwares, groupecontroller.update]);
};

module.exports = initializePutRoutes;
