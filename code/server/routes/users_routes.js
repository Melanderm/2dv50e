const users = require('./controller/user_controller.js');
const login = require('./controller/login_controller.js');

module.exports = function(app, db) {

  app.post('/users', users.create);

  app.get('/users', users.findAll);

  app.get('/users/:id', users.findOne);

  app.put('/users/:id', users.update);

  app.delete('/users/:id', users.delete);

  app.get('/users/logout', users.findAll);

};
