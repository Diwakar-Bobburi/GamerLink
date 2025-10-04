const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      return !this.isOAuthUser;
    },
    minlength: 6
  },
  isOAuthUser: {
    type: Boolean,
    default: false
  },
  oauthProvider: {
    type: String,
    enum: ['twitch', 'discord'],
    default: null
  },
  oauthId: {
    type: String,
    default: null
  },
  profile: {
    firstName: {
      type: String,
      trim: true,
      maxlength: 50
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 50
    },
    gamerTag: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    bio: {
      type: String,
      maxlength: 500,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    coverImage: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      maxlength: 100,
      default: ''
    },
    website: {
      type: String,
      default: ''
    },
    socialLinks: {
      twitch: { type: String, default: '' },
      discord: { type: String, default: '' },
      youtube: { type: String, default: '' },
      twitter: { type: String, default: '' }
    }
  },
  gaming: {
    favoriteGames: [{
      game: { type: String, required: true },
      rank: { type: String, default: '' },
      hoursPlayed: { type: Number, default: 0 },
      achievements: [String]
    }],
    tournamentHistory: [{
      tournamentName: { type: String, required: true },
      placement: { type: Number, required: true },
      date: { type: Date, required: true },
      prize: { type: Number, default: 0 },
      team: { type: String, default: '' }
    }],
    highlightVideos: [{
      title: { type: String, required: true },
      url: { type: String, required: true },
      game: { type: String, required: true },
      description: { type: String, default: '' },
      createdAt: { type: Date, default: Date.now }
    }]
  },
  career: {
    role: {
      type: String,
      enum: ['player', 'coach', 'analyst', 'caster', 'manager', 'recruiter', 'other'],
      default: 'player'
    },
    experience: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'professional'],
      default: 'beginner'
    },
    availability: {
      type: String,
      enum: ['available', 'busy', 'not-looking'],
      default: 'available'
    },
    salaryExpectation: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' }
    },
    skills: [String],
    languages: [String]
  },
  stats: {
    profileViews: { type: Number, default: 0 },
    connectionsCount: { type: Number, default: 0 },
    postsCount: { type: Number, default: 0 },
    achievementsCount: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now }
  },
  achievements: [{
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    earnedAt: { type: Date, default: Date.now },
    points: { type: Number, default: 0 }
  }],
  badges: [{
    name: { type: String, required: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    earnedAt: { type: Date, default: Date.now }
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
userSchema.index({ 
  'profile.gamerTag': 'text', 
  'profile.firstName': 'text', 
  'profile.lastName': 'text',
  'gaming.favoriteGames.game': 'text'
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || this.isOAuthUser) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (this.isOAuthUser) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get public profile data
userSchema.methods.getPublicProfile = function() {
  const userObj = this.toObject();
  delete userObj.password;
  delete userObj.email;
  return userObj;
};

module.exports = mongoose.model('User', userSchema);
