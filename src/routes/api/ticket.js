const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');

const Ticket = require('../../../models/Ticket');

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'description is required').isLength({ min: 20 }),
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
    const { title, JobType, description, location, completionDate } = req.body;
    const ticketField = {};
    ticketField.user = req.user.id;
    if (title) ticketField.title = title;
    if (JobType) ticketField.JobType = JobType;
    if (description) ticketField.description = description;
    if (location) ticketField.location = location;
    if (completionDate) ticketField.completionDate = completionDate;

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

module.exports = router;
