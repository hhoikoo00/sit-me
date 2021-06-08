const Server = require("./firebase/server");
const SampleDB = require("./db/sample");

const server = new Server();
const sample = new SampleDB(server);

module.exports = {
  sample,
};

