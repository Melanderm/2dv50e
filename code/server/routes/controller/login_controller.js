exports.reqLogin = function(req, res, next) {

  if (req.session && req.session.userId) {
     return next();
   } else {
     res.status(403).send({error:"Not logged in",message: "You need to be logged in"});
     return next(err);
   }

};
