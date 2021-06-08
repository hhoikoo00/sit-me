// DB Refs
const AREAS = "areas";

class AreasDB {
  constructor(server) {
    this.database = server.fetchDatabase().ref();
    this.areas = this.database.child(AREAS);
  }

  async getDetailedInfo(areaId) {
    // TODO
  }

  async getInfo() {
    // TODO
  }
}

module.exports = AreasDB;
