const Server = require("./firebase/server");

const SeatsDB = require("./db/seats");
const AreasDB = require("./db/areas");
const bookingTimeout = require("./timeout/booking");
const breakTimeout = require("./timeout/break");

const server = new Server();
const seats = new SeatsDB(server);
const areas = new AreasDB(server);

// Initialise timeout modules
bookingTimeout.onStartup(server, seats);
breakTimeout.onStartup(server, seats);

module.exports = {
  seats,
  areas,
};

