const express = require('express');
const auth = require('../middleware/auth');
const Job = require('../models/Job');
const Application = require('../models/Application');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { title, description, skills, location, tags, wallet } = req.body;
  // Here you'd check if wallet has paid before allowing posting
  const job = new Job({ title, description, skills, location, tags, postedBy: req.user.email });
  await job.save();
  res.json(job);
});

router.get('/', async (req, res) => {
  const { skill, location, tag } = req.query;
  const query = {};
  if (skill) query.skills = skill;
  if (location) query.location = location;
  if (tag) query.tags = tag;
  const jobs = await Job.find(query);
  res.json(jobs);
});

router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json(job);
});

router.post('/:id/apply', auth, async (req, res) => {
  const { bio } = req.body;
  const application = new Application({ jobId: req.params.id, applicant: req.user.email, bio });
  await application.save();
  res.json({ msg: 'Application submitted' });
});

router.get('/:id/applicants', auth, async (req, res) => {
  const applications = await Application.find({ jobId: req.params.id });
  res.json(applications);
});

module.exports = router;