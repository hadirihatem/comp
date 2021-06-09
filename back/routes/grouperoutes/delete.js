var groupecontroller = require('../../controllers/groupe.controllers');
const authmidllwares = require('../../midllwares/auth/authmidllwares');
const initializeDeleteRoutes = (app) => {
  app.delete("/groupe/:groupeId", [authmidllwares, groupecontroller.removeById ]);
};

module.exports = initializeDeleteRoutes;
