const Server = require("./server");
const Database = require("./database");

const server = new Server();
const database = new Database(server);

module.exports = database;

