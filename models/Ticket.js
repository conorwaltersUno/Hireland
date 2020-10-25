const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  jobType: {
    type: mongoose.Schema.Types.String,
    ref: 'jobType',
  },
  quote: [
    {
      price: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
        default: Date.now,
      },
      additionalText: {
        type: String,
      },
    },
  ],
  title: {
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
  dateToBeCompleted: {
    type: Date,
    required: true,
  },
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);
