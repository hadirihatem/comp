var postcontroller = require("../../controllers/post.controllers");
const authmidllwares = require("../../midllwares/auth/authmidllwares");
  const { upload } = require("../../midllwares/filehelper/filehelper");


 
 const initializePostRoutes = (app) => {
  app.post("/post/create", [ upload ,postcontroller.insert]);

};



module.exports = initializePostRoutes;
