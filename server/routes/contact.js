const express = require('express');
const ContactMessage = require('../models/ContactMessage');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name = '', email = '', phone = '', message = '' } = req.body;
    if (!name.trim() || !email.trim() || !message.trim()) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    const saved = await ContactMessage.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      message: message.trim()
    });
    return res.status(201).json({ message: 'Message stored. We will be in touch soon.', data: saved });
  } catch (error) {
    console.error('Contact submission failed', error);
    return res.status(500).json({ message: 'Could not store message' });
  }
});

module.exports = router;
