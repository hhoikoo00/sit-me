const admin = require("firebase-admin");
const config = require("../utils/config");

class Server {
    constructor() {
        this.initialised = false;
        this._initialise();
    }

    _initialise() {
        if (this.initialised) {
            console.error("Attempted to reinitialize the server");
        } else {
            admin.initializeApp(
                {
                    credential: admin.credential.cert(config.serviceAccount),
                    databaseURL: config.databaseURI,
                }
            );
            this.initialised = true;
        }
    }

    fetchDatabase() {
        return admin.database();
    }
}

module.exports = Server 
