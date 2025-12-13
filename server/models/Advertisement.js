const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    cta: { type: String, required: true },
    imageUrl: { type: String, required: true },
    tagline: { type: String, default: '' },
    active: { type: Boolean, default: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Advertisement', advertisementSchema);
