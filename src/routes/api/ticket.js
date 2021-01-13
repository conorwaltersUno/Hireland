const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');

const Ticket = require('../../../models/Ticket');
const User = require('../../../models/User');

// @route   GET api/ticket/me
// @desc    Get current user ticket/tickets based on userID in token
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'isTrader']);

    if (!ticket) {
      return res.status(400).json({ msg: 'There is no ticket for this user' });
    }

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/ticket
// @desc    Create a ticket
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('jobType', 'JobType is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check(
        'completionDate',
        'Please include desired date for the job to be completed'
      )
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, jobType, description, location, completionDate } = req.body;
    const ticketField = {};
    ticketField.user = req.user.id;
    if (title) ticketField.title = title;
    if (jobType) ticketField.jobType = jobType;
    if (description) ticketField.description = description;
    if (location) ticketField.location = location;
    if (completionDate) ticketField.completionDate = completionDate;

    //only allow one ticket per user, need to fix
    try {
      //let user = await User.findById({ user: req.user.id });
      let ticket = await Ticket.findOne({ user: req.user.id });

      //If ticket id exist, update the ticket
      if (ticket) {
        ticket = await Ticket.findOneAndUpdate(
          { user: req.user.id },
          { $set: ticketField },
          { new: true }
        );
        return res.json(ticket);
      }

      ticket = new Ticket(ticketField);
      await ticket.save();
      res.json(ticket);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route   GET api/ticket
// @desc    GET all tickets
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ date: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.nessage);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/ticket/:id
// @desc    GET ticket by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ msg: 'ticket not found' });
    }
    res.json(ticket);
  } catch (err) {
    console.error(err.nessage);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'ticket not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   Delete api/ticket/:id
// @desc    Delete a ticket by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    //check that user owns the ticket
    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await ticket.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.nessage);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/ticket/quote
// @desc    Create a quote for ticket as trader
// @access  Private
router.post(
  '/quote/:id',
  auth,
  check('quote', 'Quote is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const { quote } = req.body;
    // const quoteField = {};
    // if (quote) quoteField.quote = quote;

    try {
      const user = await User.findById(req.user.id).select('-password');
      //let user = await User.findById(req.user.id);
      //let ticket = await ticket.findById(req.params.id);
      const ticket = await Ticket.findById(req.params.id);

      const newQuote = {
        quote: req.body.quote,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      ticket.quotes.unshift(newQuote);

      await ticket.save();

      res.json(ticket.quotes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
