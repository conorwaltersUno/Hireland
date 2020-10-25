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
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);
