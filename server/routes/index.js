const express = require('express');
// const { v4: uuidv4 } = require('uuid');

// const { User } = require('../db/user');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Our API is running...');
});

module.exports = router;
