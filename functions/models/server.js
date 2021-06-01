const admin = require("firebase-admin");

const config = require("../utils/config");
const logger = require("../utils/logger");

/**
 * A class that models a server connection
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
   * Returns database object
   * @return {Object} database
   */
  fetchDatabase() {
    return admin.database();
  }
}

module.exports = Server;
