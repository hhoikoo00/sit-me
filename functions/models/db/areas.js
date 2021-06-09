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

  async getInfo(areaId) {
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

    // If no areaId specified, it returns info for all areas
    if (areaId === undefined) {
      return areaList;
    } else {
      return areaList.find((area) => area.areaId === areaId);
    }
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
