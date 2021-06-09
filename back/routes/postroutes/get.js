var postcontroller = require("../../controllers/post.controllers");
var authmidllwares = require("../../midllwares/auth/authmidllwares");

const initalizeposteroute = (app) => {
  app.get("/post/:postId", [authmidllwares, postcontroller.getpost]);
  app.get("post/date",authmidllwares,postcontroller.getpostbydate);
  app.get("post/mostliked",[authmidllwares,postcontroller.mostliked]);
  app.get("/posts", [authmidllwares, postcontroller.list]);
  app.get("/comment/mostcomment",[authmidllwares,postcontroller.mostcommented])
  app.get("/post/getmypost",[authmidllwares,postcontroller.getmypost]);
};
module.exports = initalizeposteroute;
