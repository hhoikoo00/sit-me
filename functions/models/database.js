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
}

module.exports = Database;
