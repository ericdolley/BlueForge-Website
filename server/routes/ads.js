const express = require('express');
const Advertisement = require('../models/Advertisement');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const ads = await Advertisement.find({ active: true }).sort({ createdAt: -1 });
    return res.json(ads);
  } catch (error) {
    console.error('Fetching ads failed', error);
    return res.status(500).json({ message: 'Could not load advertisements' });
  }
});

module.exports = router;
