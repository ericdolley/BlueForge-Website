const mongoose = require('mongoose');

const uploadFileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    resumeFiles: [uploadFileSchema],
    portfolioFiles: [uploadFileSchema],
    projectFiles: [uploadFileSchema],
    portfolioLinks: [{ type: String }],
    contactPhone: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

userSchema.set('toJSON', {
  transform(doc, ret) {
    delete ret.password;
    delete ret.__v;
    delete ret.verificationToken;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);
