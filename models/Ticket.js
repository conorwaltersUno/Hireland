const mongoose = require('mongoose');

//jobType required needs fixed

const TicketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  jobType: {
    type: String,
    //required: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  completionDate: {
    type: Date,
    required: true,
  },
  isCompleteUser: {
    type: Boolean,
    default: false,
  },
  hasreviewed: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
  quotes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      quote: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      isAccepted: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);
