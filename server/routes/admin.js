const express = require('express');
const Advertisement = require('../models/Advertisement');
const ContactMessage = require('../models/ContactMessage');
const User = require('../models/User');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { sendAdminReply } = require('../utils/email');

const router = express.Router();

router.use(requireAuth);
router.use(requireAdmin);

router.get('/messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.json(messages);
  } catch (error) {
    console.error('Admin messages fetch failed', error);
    return res.status(500).json({ message: 'Could not fetch messages' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).limit(100).lean();
    return res.json(users.map(user => ({ ...user, password: undefined, verificationToken: undefined })));
  } catch (error) {
    console.error('Admin users fetch failed', error);
    return res.status(500).json({ message: 'Could not list users' });
  }
});

router.get('/ads', async (req, res) => {
  try {
    const ads = await Advertisement.find().sort({ createdAt: -1 });
    return res.json(ads);
  } catch (error) {
    console.error('Admin ads fetch failed', error);
    return res.status(500).json({ message: 'Could not fetch ads' });
  }
});

router.post('/ads', async (req, res) => {
  try {
    const { title, description, cta, imageUrl, tagline } = req.body;
    if (!title || !description || !cta || !imageUrl) {
      return res.status(400).json({ message: 'Title, description, CTA, and image URL are required' });
    }
    const ad = await Advertisement.create({ title, description, cta, imageUrl, tagline: tagline || '', active: true });
    return res.status(201).json(ad);
  } catch (error) {
    console.error('Ad creation failed', error);
    return res.status(500).json({ message: 'Could not create advertisement' });
  }
});

router.put('/ads/:id', async (req, res) => {
  try {
    const ad = await Advertisement.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    const updateFields = ['title', 'description', 'cta', 'imageUrl', 'tagline', 'active'];
    updateFields.forEach(field => {
      if (req.body[field] !== undefined) {
        ad[field] = req.body[field];
      }
    });
    await ad.save();
    return res.json(ad);
  } catch (error) {
    console.error('Ad update failed', error);
    return res.status(500).json({ message: 'Could not update advertisement' });
  }
});

router.post('/reply', async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    if (!email || !message) {
      return res.status(400).json({ message: 'Recipient email and message content are required' });
    }
    await sendAdminReply({ to: email, subject: subject || 'Message from Dev Studio', message });
    return res.json({ message: 'Reply sent' });
  } catch (error) {
    console.error('Reply email failed', error);
    return res.status(500).json({ message: 'Could not send reply' });
  }
});

module.exports = router;
