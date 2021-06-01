const Database = require('./database');

const Server = require('./server')

const server = new Server();

const database = new Database(server);

module.exports = database;

