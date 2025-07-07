const express = require('express');
const multer = require('multer');
const axios = require('axios');
const auth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/match - Bio vs Job matching using HuggingFace
router.post('/', auth, async (req, res) => {
  const { bio, job } = req.body;

  try {
    const hfResponse = await axios.post(
      'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2',
      {
        inputs: {
          source_sentence: job,
          sentences: [bio]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`
        }
      }
    );

    res.json({ matchScore: hfResponse.data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching from Hugging Face' });
  }
});

// POST /api/match/extract - Resume skill extraction
const sampleSkills = [
  'React', 'Node.js', 'JavaScript', 'Python', 'MongoDB',
  'Express', 'SQL', 'Docker', 'AWS', 'Java', 'C++', 'TypeScript'
];

router.post('/extract', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const resumeText = req.file.buffer.toString('utf-8');
    const matchedSkills = sampleSkills.filter(skill =>
      resumeText.toLowerCase().includes(skill.toLowerCase())
    );

    res.json({ topSkills: matchedSkills });
  } catch (error) {
    console.error('Resume parsing error:', error);
    res.status(500).json({ message: 'Error extracting skills' });
  }
});

module.exports = router;