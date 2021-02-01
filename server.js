const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Api running'));

//Define routes
app.use('/api/users', require('../Hireland/src/routes/api/users'));
app.use('/api/auth', require('../Hireland/src/routes/api/auth'));
app.use('/api/profile', require('../Hireland/src/routes/api/profile'));
app.use('/api/ticket', require('../Hireland/src/routes/api/ticket'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
