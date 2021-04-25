/* eslint-disable no-console */
const express = require('express');
// const bodyParser = require('body-parser'); // deprecated - https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
const cors = require('cors');
import sequelize from'./db/index';

require('dotenv').config();

const routes = require('./routes/index');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Our API is running...');
});


app.use('/api', routes);



sequelize.authenticate((err) => {
  if (err) {
    console.log(`Could not connect to database: ${db}`)
    console.log(`Error: ${err}`)
    process.exit(1);
  }
  console.log(`Successfully connected to database: ${db}`)
  app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
});
