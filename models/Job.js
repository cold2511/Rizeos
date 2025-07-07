const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  skills: [String],
  location: String,
  tags: [String],
  postedBy: String,
});
module.exports = mongoose.model('Job', JobSchema);

