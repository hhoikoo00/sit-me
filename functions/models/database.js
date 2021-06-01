/**
 * A class used to model database transactions
 */
class Database {
  /**
   * Constructor for accessing the database from the server
   * @param {Server} server server object
   */
  constructor(server) {
    this.database = server.fetchDatabase();
  }

  /**
   * An example function to push data to the '/test' URI
   * @param {Object} data
   */
  pushData(data) {
    this.database.ref("/test").push(data);
  }
}

module.exports = Database;
