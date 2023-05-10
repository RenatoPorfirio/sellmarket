mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'admin2',
  password: 'Rapadura123.',
  database: 'sellmarketdb'
});

module.exports = pool;