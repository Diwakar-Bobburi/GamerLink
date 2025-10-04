const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  game: {
    type: String,
    required: true
  },
  format: {
    type: String,
    enum: ['single-elimination', 'double-elimination', 'round-robin', 'swiss', 'bracket'],
    required: true
  },
  type: {
    type: String,
    enum: ['online', 'lan', 'hybrid'],
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'registration-open', 'registration-closed', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  schedule: {
    registrationStart: { type: Date, required: true },
    registrationEnd: { type: Date, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  requirements: {
    minRank: { type: String, default: '' },
    maxRank: { type: String, default: '' },
    minAge: { type: Number, default: 0 },
    maxAge: { type: Number, default: 100 },
    region: { type: String, default: '' },
    teamSize: { type: Number, default: 1 },
    entryFee: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' }
  },
  prizePool: {
    total: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    distribution: [{
      place: { type: Number, required: true },
      amount: { type: Number, required: true },
      percentage: { type: Number, default: 0 }
    }]
  },
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    team: { type: String, default: '' },
    registeredAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['registered', 'confirmed', 'disqualified', 'withdrawn'],
      default: 'registered'
    }
  }],
  maxParticipants: {
    type: Number,
    default: 0 // 0 means unlimited
  },
  rules: [String],
  streamUrl: {
    type: String,
    default: ''
  },
  bracketUrl: {
    type: String,
    default: ''
  },
  location: {
    venue: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    country: { type: String, default: '' }
  },
  sponsors: [{
    name: { type: String, required: true },
    logo: { type: String, default: '' },
    website: { type: String, default: '' }
  }],
  views: { type: Number, default: 0 },
  participantsCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Index for tournament search
tournamentSchema.index({ createdAt: -1 });
tournamentSchema.index({ game: 1, status: 1 });
tournamentSchema.index({ 'schedule.startDate': 1 });
tournamentSchema.index({ 'schedule.registrationEnd': 1 });

module.exports = mongoose.model('Tournament', tournamentSchema);
