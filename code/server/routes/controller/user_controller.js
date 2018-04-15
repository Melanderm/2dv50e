const User = require('../schema/userSchema.js');

// create
//
//
exports.create = function(req, res, next) {

  if(!req.body) {
     res.status(400).send({message: "User can not be empty"});
 }
 else if (req.body.logusername && req.body.logpassword) {

    User.authenticate(req.body.logusername, req.body.logpassword, function (error, user) {
      if (error || !user) {
        res.status(401).send("Wrong email or password");
        return next(err);
      } else {
        console.log("check userID: " + user._id);
        req.session.userId = user._id;
        return res.send("Successfully logged in: \nUsername: " + req.body.logusername);
      }
    });
  }
  else if (req.body.name && req.body.username && req.body.password) {
   var newUser = new User({
     name: req.body.name,
     username: req.body.username,
     password: req.body.password
   });


   newUser.save(function(err) {
     if (err) {
       if (err.code == 11000)
         res.status(500).send("An user whit that name already exists");
       else
         res.status(500).send(err.errmsg);

      console.log(err);
    } else {
      res.send(newUser);
  }
 });
} else
  res.status(400).send("Fields doesn't match the request");


};


// findAll
//
//
exports.findAll = function(req, res) {

  User.find({}, function(err, users) {
    if (err) {
     res.status(500).send({message: "Some error occurred while retrieving notes."});
     console.log(err);
   } else {
     res.send(users);
   }
  });

};


// findOne
//
//
exports.findOne = function(req, res) {

  User.findById(req.params.id, function(err, user) {
    if (err) {
     console.log(err);
     res.status(500).send({message: "Could not retrieve user with id " + req.params.noteId});
   } else {
     res.send(user);
   }
  });

};


// update
//
//
exports.update = function(req, res) {

  User.findByIdAndUpdate(req.params.id, { username: 'starlord88' }, function(err, user) {
    if (err) {
     console.log(err);
     res.status(500).send({message: "Could not update user with id " + req.params.noteId});
   } else {
     res.send(user);
   }
  });

};


// delete
//
//
exports.delete = function(req, res) {

  User.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
     console.log(err);
     res.status(500).send({message: "Could not delete note with id " + req.params.id});
   } else {
     res.send('Deleted');
   }
  });

};


// logout
//
//
exports.logout = function(req, res) {

  if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }

};

// reqLogin
//
//
exports.reqLogin = function(req, res, next) {

  if (req.session && req.session.userId) {
     return next();
   } else {
     res.send({error:"Not logged in",message: "You need to be logged in"});
     return next(err);
   }

};
