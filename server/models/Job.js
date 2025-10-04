const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'freelance', 'internship'],
    required: true
  },
  role: {
    type: String,
    enum: ['player', 'coach', 'analyst', 'caster', 'manager', 'content-creator', 'other'],
    required: true
  },
  game: {
    type: String,
    required: true
  },
  requirements: {
    experience: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'professional'],
      required: true
    },
    skills: [String],
    languages: [String],
    rank: {
      type: String,
      default: ''
    },
    age: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 100 }
    }
  },
  compensation: {
    salary: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' }
    },
    benefits: [String],
    perks: [String]
  },
  location: {
    type: {
      type: String,
      enum: ['remote', 'on-site', 'hybrid'],
      required: true
    },
    address: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: ''
    }
  },
  team: {
    name: { type: String, default: '' },
    logo: { type: String, default: '' },
    website: { type: String, default: '' },
    description: { type: String, default: '' }
  },
  applicationDeadline: {
    type: Date,
    default: null
  },
  startDate: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'closed', 'filled'],
    default: 'active'
  },
  applications: [{
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    coverLetter: { type: String, maxlength: 1000 },
    resume: { type: String, default: '' },
    portfolio: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'interview', 'accepted', 'rejected'],
      default: 'pending'
    },
    appliedAt: { type: Date, default: Date.now },
    notes: { type: String, default: '' }
  }],
  views: { type: Number, default: 0 },
  applicationsCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Index for job search
jobSchema.index({ createdAt: -1 });
jobSchema.index({ game: 1, role: 1 });
jobSchema.index({ 'requirements.experience': 1 });
jobSchema.index({ 'location.type': 1 });
jobSchema.index({ status: 1 });

module.exports = mongoose.model('Job', jobSchema);
