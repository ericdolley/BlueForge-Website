const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication token is required' });
    }
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error', error);
    return res.status(401).json({ message: 'Token verification failed' });
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Administrator access required' });
  }
  next();
};

module.exports = { requireAuth, requireAdmin };
