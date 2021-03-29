/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./db/index');

require('dotenv').config();

const routes = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Our API is running...');
});

app.use('/api', routes);

connectDB().then(async () => {
  app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
});
