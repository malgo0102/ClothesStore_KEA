/* eslint-disable no-console */
import { Sequelize } from 'sequelize';

const DB_HOST = process.env.DB_HOST
const DB = process.env.DB
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_DIALECT = process.env.DB_DIALECT // Which type of db to connect to; in our case, a 'mysql' database

// Sequelize database connection
const sequelize = new Sequelize(DB, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false
});

sequelize.authenticate((err) => {
    if (err) {
      console.log(`Could not connect to database: ${db}`)
      console.log(`Error: ${err}`)
      process.exit(1);
    }
    console.log(`Successfully connected to database: ${db}`)
  });


// Sequelize assumes our tables have a primary key of id by default
// when defining models with sequelize.define(model_name, {fields}, {options})
export default sequelize;

