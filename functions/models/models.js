const Server = require("./firebase/server");
const SeatsDB = require("./db/seats");
const AreasDB = require("./db/areas");

const server = new Server();
const seats = new SeatsDB(server);
const areas = new AreasDB(server);

module.exports = {
  seats,
  areas,
};

