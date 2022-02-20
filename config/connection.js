// require Sequelize module 
const Sequelize = require('sequelize');

// require dotenv file and configure. dotenv is a lightweight npm package that automatically loads environment variable from a .env file
require('dotenv').config();

// instatiate sequelize variable
let sequelize;

// need JAWSDB to deploy app with MySQL to Heroku
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
