/**
 * A class that models a database
 */
class Database {
  /**
   * constructor
   * @param {Object} server server object
   */
  constructor(server) {
    this.database = server.fetchDatabase();
  }
}

module.exports = Database;
