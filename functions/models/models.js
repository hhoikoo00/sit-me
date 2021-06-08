const Server = require("./firebase/server");
const SampleDB = require("./db/sample");
const SeatsDB = require("./db/seats");

const server = new Server();
const sample = new SampleDB(server);
const seats = new SeatsDB(server);

module.exports = {
  sample,
  seats,
};

