const pg = require('pg')
require('dotenv').config();

const user = process.env.DB_USER
const password = process.env.DB_PWD
const host = process.env.DB_HOSTNAME
const port = process.env.DB_PORT
const database = process.env.DB_NAME
const max_connections = process.env.DB_MAX_CONNECTIONS

var config = {
  user: user, 
  host: host,
  password: password,
  port: port,
  max: max_connections,
  dbname: database,
  database: database,
  idleTimeoutMillis: 30000
}

var pool = new pg.Pool(config);

module.exports = pool;
