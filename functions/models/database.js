const admin = require("firebase-admin");

class Database {
    constructor() {
        this.database = admin.database();
    }

    push_data(data) {
        this.database.ref("test_pushes").push(data);
    }
}
module.exports = Database