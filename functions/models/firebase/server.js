const admin = require("firebase-admin");
const config = require("../../utils/config");

// Initialize credentials for database
admin.initializeApp({
  credential: admin.credential.cert(config.serviceAccount),
  databaseURL: config.databaseURI,
});

/**
 * A class used to model external servers
 */
class Server {
  /**
   * Returns database object
   * @return {Object} database
   */
  fetchDatabase() {
    return admin.database();
  }
}

module.exports = Server;
