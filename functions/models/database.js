const admin = require("firebase-admin");

class Database {
    constructor(server) {
        this.database = server.fetchDatabase()
    }
}
module.exports = Database