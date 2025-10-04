const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  media: [{
    type: { type: String, enum: ['image', 'video', 'clip'] },
    url: { type: String, required: true },
    thumbnail: { type: String, default: '' },
    duration: { type: Number, default: 0 }, // for videos
    game: { type: String, default: '' }
  }],
  game: {
    type: String,
    default: ''
  },
  tags: [String],
  type: {
    type: String,
    enum: ['update', 'achievement', 'highlight', 'strategy', 'question', 'announcement'],
    default: 'update'
  },
  visibility: {
    type: String,
    enum: ['public', 'connections', 'private'],
    default: 'public'
  },
  engagement: {
    likes: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now }
    }],
    comments: [{
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: { type: String, required: true, maxlength: 500 },
      createdAt: { type: Date, default: Date.now },
      likes: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }
      }]
    }],
    shares: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now }
    }],
    views: { type: Number, default: 0 }
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for feed queries
postSchema.index({ createdAt: -1 });
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ 'engagement.likes': 1 });
postSchema.index({ game: 1 });

module.exports = mongoose.model('Post', postSchema);
