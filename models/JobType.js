const mongoose = require('mongoose');

const JobTypeSchema = new mongoose.Schema({
  jobs: [
    'plumbing',
    'roofing',
    'electrical repair',
    'carpentry',
    'gardening',
    'Solar installation',
  ],
});

module.exports = JobType = mongoose.model('jobType', JobTypeSchema);
