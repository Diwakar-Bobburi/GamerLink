const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'blocked'],
    default: 'pending'
  },
  message: {
    type: String,
    maxlength: 200,
    default: ''
  },
  connectionType: {
    type: String,
    enum: ['player', 'coach', 'recruiter', 'teammate', 'friend'],
    default: 'friend'
  },
  acceptedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Ensure unique connections
connectionSchema.index({ requester: 1, recipient: 1 }, { unique: true });

// Index for user queries
connectionSchema.index({ requester: 1, status: 1 });
connectionSchema.index({ recipient: 1, status: 1 });

module.exports = mongoose.model('Connection', connectionSchema);
