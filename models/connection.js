const pg = require('pg-promise')({
// Initialization Options
});

const config = process.env.DATABASE_URL || {
  host:       process.env.DB_HOST,
  port:       process.env.DB_PORT,
  database:   process.env.DB_NAME,
  user:       process.env.DB_USER,
  password:   process.env.DB_PASS,
};

module.exports = pg(config);
