const projectRoutes = require('./project_routes');
const usersRoutes = require('./users_routes');

module.exports = function(app, db) {
  projectRoutes(app, db);
  usersRoutes(app, db);
};
