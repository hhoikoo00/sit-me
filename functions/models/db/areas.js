// DB Refs
const AREAS = "areas";
const SEATS = "seats";

// Seat status
const FREE = "FREE";

class AreasDB {
  constructor(server) {
    this.database = server.fetchDatabase().ref();
    this.areas = this.database.child(AREAS);
    this.seats = this.database.child(SEATS);
  }

  async getInfo() {
    const areaObject = (await this.areas.get()).val();
    const areaList = Object.entries(areaObject)
        .map(([id, area]) => {
          return {
            areaId: id,
            areaName: area.name,
            currentNumber: area.current,
            capacity: area.capacity,
          };
        });
    return areaList;
  }

  async getAreaName(areaId) {
    const snapshot = await this.areas.child(areaId).get();

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.name;
  }

  async getDetailedInfo(areaId) {
    const seatsObject = (await this.seats.get()).val();
    const seats = Object.entries(seatsObject)
        .filter(([key, { location: { areaId: id } }]) => id === areaId)
        .map(([seatId, { status }]) => {
          return {
            seatId,
            isBooked: status !== FREE,
          };
        });
    return seats;
  }
}

module.exports = AreasDB;
