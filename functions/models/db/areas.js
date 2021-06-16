const { AREAS, SEATS, FREE } = require("../../utils/constants");

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
            map: area.mapUrl,
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
        .map(([seatId, { status, coords }]) => {
          return {
            seatId,
            isBooked: status !== FREE,
            status: status,
            location: coords,
          };
        });

    const area = await this.getInfo(areaId);
    return { ...area, seats };
  }
}

module.exports = AreasDB;
