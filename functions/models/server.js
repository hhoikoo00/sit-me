const admin = require("firebase-admin");

const config = require("../utils/config");
const logger = require("../utils/logger");

/**
 * A class used to model external servers
 */
class Server {
  /**
   * constructor for Server
   */
  constructor() {
    this.initialised = false;
    this._initialise();
  }

  /**
   * private one-time initializer
   */
  _initialise() {
    if (this.initialised) {
      logger.error("Attempted to reinitialize the server");
    } else {
      admin.initializeApp({
        credential: admin.credential.cert(config.serviceAccount),
        databaseURL: config.databaseURI,
      });
      this.initialised = true;
    }
  }

  /**
   * Fetches a database connection object from the server
   * @return {Object} database
   */
  fetchDatabase() {
    return admin.database();
  }
}

module.exports = Server;
