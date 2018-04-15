const projectSchema = require('../schema/projectSchema.js');

// create
//
//
exports.create = function(req, res) {

  if(!req.body) {
     res.status(400).send({message: "Project can not be empty"});
 }
  var newProject = new projectSchema({
      _id: req.body.id,
      name: req.body.name,
    });


    newProject.save(function(err) {
      if (err) {
        if (err.code == 11000)
          res.status(500).send("An project with that ID already exists");
        else
          res.status(500).send(err.errmsg);

       console.log(err);
   } else {
       res.send(newProject);
   }
  });

};


// findAll
//
//
exports.findAll = function(req, res) {

  projectSchema.find({}, function(err, projects) {
    if (err) {
      res.status(500).send(err);
     console.log(err);
   } else {
     res.send(projects);
   }
 });

};


// findOne
//
//
exports.findOne = function(req, res) {

  projectSchema.findById(req.params.id, function(err, project) {
    if (err) {
     console.log(err);
      res.status(500).send(err);
   } else {
     res.send(project);
   }
  });

};


// update
//
//
exports.update = function(req, res) {

  projectSchema.findByIdAndUpdate(req.params.id, { name: 'starlord88' }, function(err, project) {
    if (err) {
     console.log(err);
      res.status(500).send(err);
   } else {
     res.send(project);
   }
  });

};


// delete
//
//
exports.delete = function(req, res) {

  projectSchema.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
     console.log(err);
      res.status(500).send(err);
   } else {
     res.send('Deleted');
   }
  });

};
