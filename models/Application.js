const mongoose = require('mongoose');
const ApplicationSchema = new mongoose.Schema({
  jobId: String,
  applicant: String,
  bio: String,
});
module.exports = mongoose.model('Application', ApplicationSchema);