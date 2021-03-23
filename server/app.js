/* eslint-disable no-console */
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Our API is running...');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
