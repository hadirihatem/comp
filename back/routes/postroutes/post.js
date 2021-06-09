var postcontroller = require("../../controllers/post.controllers");
const authmidllwares = require("../../midllwares/auth/authmidllwares");

const initializePostRoutes = (app) => {
  app.post("/post/create", [postcontroller.insert]);
  
  

};

module.exports = initializePostRoutes;
