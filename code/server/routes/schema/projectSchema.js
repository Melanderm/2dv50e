var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var projectSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

projectSchema.pre("save", function(next) {
  var currentDate = new Date();

 // change the updated_at field to current date
 this.updated_at = currentDate;

 // if created_at doesn't exist, add to that field
 if (!this.created_at)
   this.created_at = currentDate;

 next();
});


var Project = mongoose.model('Project', projectSchema);


module.exports = Project;
