// config.js
require("dotenv").config();

const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  },
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
