const deleteRoutes = require("./delete");
const getRoutes = require("./get");
const putRoutes = require("./put");
const postRoutes = require("./post");

const initializeRoutes = (app) => {
 deleteRoutes(app);
  getRoutes(app);
  putRoutes(app);
  postRoutes(app);
};
module.exports = initializeRoutes;
