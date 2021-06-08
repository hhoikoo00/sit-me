// const ROUTE = "seats";

class SeatsDB {
  constructor(server) {
    this.database = server.fetchDatabase();
  }

  async getSeat(seatId) {

  }

  async getUser(userId) {

  }

  async book(userId, seatId, startTime, endTime) {

  }

  async unbook(userId, seatId) {

  }
}

module.exports = SeatsDB;
