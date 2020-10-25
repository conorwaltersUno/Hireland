const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  isTrader: {
    type: mongoose.Schema.Types.Boolean,
    ref: 'user',
  },
  completedTickets: [
    {
      ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ticket',
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        //@To-do chenge so that the date can be updated when the job is completed
        default: Date.now,
      },
    },
  ],
  Reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      text: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
