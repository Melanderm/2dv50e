const projects = require('./controller/project_controller.js');
const login = require('./controller/login_controller.js');

module.exports = function(app, db) {

 app.post('/projects',  projects.create);

 app.get('/projects',  projects.findAll);

 app.get('/projects/:id',  projects.findOne);

 app.put('/projects/:id',  projects.update);

 app.delete('/projects/:id',  projects.delete);

};
