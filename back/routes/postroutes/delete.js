var postcontroller = require('../../controllers/post.controllers');
const authmidllwares = require('../../midllwares/auth/authmidllwares');
const initializeDeleteRoutes = (app) => {
  app.delete("/post/:postId", [ authmidllwares,postcontroller.removeById ]);
};

module.exports = initializeDeleteRoutes;
