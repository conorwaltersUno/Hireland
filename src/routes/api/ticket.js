const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { mongoose } = require('mongoose');
const auth = require('../../../middleware/auth');
const Profile = require('../../../models/Profile');

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
    const {
      title,
      jobType,
      description,
      location,
      completionDate,
      quotes,
    } = req.body;
    const ticketField = {};
    ticketField.user = req.user.id;
    if (title) ticketField.title = title;
    if (jobType) ticketField.jobType = jobType;
    if (description) ticketField.description = description;
    if (location) ticketField.location = location;
    if (completionDate) ticketField.completionDate = completionDate;
    if (quotes) ticketField.quotes = quotes;

    //only allow one ticket per user, need to fix
    try {
      //let user = await User.findById({ user: req.user.id });
      let ticket = await Ticket.findOne({
        title: req.body.title,
        description: req.body.description,
        completionDate: req.body.completionDate,
      });

      //If ticket id exist, update the ticket
      if (ticket) {
        ticket = await Ticket.findOneAndUpdate(
          { user: req.user.id },
          { $set: ticketField },
          { new: true }
        );

        return res.json(ticket);
      } else {
        ticket = new Ticket(ticketField);
      }

      await ticket.save();
      res.json(ticket);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route   POST api/ticket
// @desc    Update a ticket
// @access  Private
router.post(
  '/:ticketid',
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
      let ticket = await Ticket.findById({
        _id: req.params.ticketid,
      });
      //If ticket id exist, update the ticket
      if (ticket) {
        ticket = await Ticket.findOneAndUpdate(
          { user: req.user.id },
          { $set: ticketField },
          { new: true }
        );
        return res.json(ticket);
      } else {
        ticket = new Ticket(ticketField);
      }

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
    console.error(err.message);
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
  check('quote', 'Quote is required and has to be numeric')
    .isNumeric()
    .not()
    .isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const ticket = await Ticket.findById(req.params.id);
      //const quotes = await Ticket.findById(req.params.id).select('quotes');

      console.log(quotes);

      const newQuote = {
        quote: req.body.quote,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      const checkUser = {
        user: req.user.id,
      };

      //ticket.quotes.unshift(newQuote);
      ticket.quotes.findOneAndReplace(
        checkUser,
        { $set: newQuote },
        {
          new: true,
        }
      );

      await ticket.save();
      console.log(ticket.quotes);
      res.json(ticket.quotes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/quote/accepted/:ticketid/:quoteid
// @desc    Update a quote to be accepted or not
// @access  Private
router.post(
  '/quote/accepted/:ticketid/:quoteid',
  auth,
  [check('isAccepted', 'isAccepted is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { isAccepted } = req.body;
    const quoteBody = {};
    if (isAccepted) quoteBody.isAccepted = isAccepted;

    try {
      const user = await User.findById(req.user.id).select('-password');
      const ticket = await Ticket.findById(req.params.ticketid);

      Ticket.findOneAndUpdate(
        { _id: req.params.ticketid, 'quotes._id': req.params.quoteid },
        {
          $set: {
            'quotes.$.isAccepted': isAccepted,
          },
        },
        function (err, doc) {}
      );
      await ticket.save();

      res.json(ticket.quotes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/completeuser/ticketid
// @desc    Update completeUser boolean in ticket model so that it is complete
// @access  Private
router.post(
  '/completeuser/:ticketid',
  auth,
  [check('isCompleteUser', 'isCompleteUser is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { isCompleteUser } = req.body;
    let ticketBody = {};
    if (isCompleteUser) ticketBody.isCompleteUser = isCompleteUser;

    try {
      const ticket = await Ticket.findById(req.params.ticketid);

      ticket.isCompleteUser = isCompleteUser;
      await ticket.save();

      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/quote/accepted/:ticketid/:quoteid
// @desc    Update a quote to be accepted or not
// @access  Private
router.post(
  '/hasReviewed/:ticketid',
  auth,
  [check('hasreviewed', 'hasreviewed is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { hasreviewed } = req.body;
    let ticketBody = {};
    if (hasreviewed) ticketBody.hasreviewed = hasreviewed;

    try {
      const ticket = await Ticket.findById(req.params.ticketid);

      ticket.hasreviewed = hasreviewed;
      await ticket.save();

      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     GET api/ticket/quote/:ticketid/:quoteid
// @desc      Get the status of all quotes of a ticket
// @access    Private
router.get('/quote/:ticketid', auth, async (req, res) => {
  try {
    const quotes = await Ticket.findById(req.params.ticketid);
    if (!quotes) {
      return res.status(404).json({ msg: 'Quotes not found' });
    }
    res.json(quotes);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Quotes not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.get('/user/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).select('user');

    res.json(ticket.user);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'ticket not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.get('/user/getuser/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
