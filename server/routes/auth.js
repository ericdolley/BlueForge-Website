const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');
const { sendVerificationEmail } = require('../utils/email');

const router = express.Router();

const getAdminEmails = () => {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(Boolean);
};

const generateToken = user => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const sanitizeUser = user => {
  if (!user) return null;
  const sanitized = user.toJSON();
  delete sanitized.password;
  delete sanitized.verificationToken;
  return sanitized;
};

router.post('/signup', async (req, res) => {
  try {
    const { firstName = '', lastName = '', email = '', password = '' } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const verificationToken = crypto.randomBytes(24).toString('hex');
    const normalizedEmail = email.toLowerCase().trim();
    const role = getAdminEmails().includes(normalizedEmail) ? 'admin' : 'user';
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      password,
      verificationToken,
      role
    });
    try {
      await sendVerificationEmail({
        to: normalizedEmail,
        token: verificationToken,
        name: `${user.firstName} ${user.lastName}`.trim()
      });
    } catch (error) {
      console.warn('Email delivery failed', error.message);
    }
    return res.status(201).json({
      message: 'Sign-up successful. A verification link has been sent to your inbox.'
    });
  } catch (error) {
    console.error('Signup error', error);
    return res.status(500).json({ message: 'Could not create account' });
  }
});

router.post('/oauth/:provider', async (req, res) => {
  try {
    const provider = req.params.provider.toLowerCase();
    const { email = '', firstName = '', lastName = '' } = req.body;
    if (!['google', 'github'].includes(provider)) {
      return res.status(400).json({ message: 'Unsupported provider' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Email is required for OAuth sign-up' });
    }
    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      const verificationToken = crypto.randomBytes(24).toString('hex');
      const role = getAdminEmails().includes(normalizedEmail) ? 'admin' : 'user';
      user = await User.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: normalizedEmail,
        password: crypto.randomBytes(12).toString('hex'),
        role,
        verified: true,
        verificationToken: null
      });
    } else if (!user.verified) {
      user.verified = true;
      user.verificationToken = null;
      await user.save();
    }
    const token = generateToken(user);
    return res.json({ token, user: sanitizeUser(user) });
  } catch (error) {
    console.error('OAuth signup failed', error);
    return res.status(500).json({ message: 'Could not complete OAuth signup' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email = '', password = '' } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (!user.verified) {
      return res.status(403).json({ message: 'Please verify your email before logging in' });
    }
    const token = generateToken(user);
    return res.json({ token, user: sanitizeUser(user) });
  } catch (error) {
    console.error('Login error', error);
    return res.status(500).json({ message: 'Could not log in' });
  }
});

router.get('/verify/:token', async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) {
      return res.status(404).json({ message: 'Verification link is invalid or expired' });
    }
    user.verified = true;
    user.verificationToken = null;
    await user.save();
    return res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verification error', error);
    return res.status(500).json({ message: 'Could not verify email' });
  }
});

router.get('/profile', requireAuth, async (req, res) => {
  const sanitized = sanitizeUser(req.user);
  return res.json({ user: sanitized });
});

module.exports = router;
