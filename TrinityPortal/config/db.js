const sql = require('mssql');
const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: (process.env.NODE_ENV = 'production'
    ? process.env.SQL_PRODUCTION_SERVER
    : process.env.SQL_SERVER),
  database: process.env.SQL_DATABASE,
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    return pool;
  })
  .catch((err) => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
  sql,
  poolPromise,
};
