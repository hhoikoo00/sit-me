const Server = require("./firebase/server");
const SeatsDB = require("./db/seats");
const AreasDB = require("./db/areas");
const timeout = require("./bookingTimeout");

const server = new Server();
const seats = new SeatsDB(server);
const areas = new AreasDB(server);

timeout.onStartup(server, seats);

module.exports = {
  seats,
  areas,
};

