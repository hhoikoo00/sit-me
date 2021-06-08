const ROUTE = "seats";
const SEATS = [
  {
    id: "seat1",
    isBooked: false,
  },
  {
    id: "seat2",
    isBooked: false,
  },
  {
    id: "seat3",
    isBooked: false,
  },
  {
    id: "seat4",
    isBooked: false,
  },
  {
    id: "seat5",
    isBooked: false,
  },
];

class SampleDB {
  constructor(server) {
    this.database = server.fetchDatabase();
  }

  async getAllSeats() {
    let snapshot = await this.database.ref().child(ROUTE).get();

    // if empty, initialize database and refetch from database
    if (!snapshot.exists()) {
      this._initDatabase(SEATS);
      snapshot = await this.database.ref().child(ROUTE).get();
    }

    return this._formatSnapshot(snapshot.val());
  }

  async getSeat(id) {
    const snapshot = await this.database.ref().child(ROUTE).get();
    return this._formatSnapshot(snapshot.val())
        .find((seat) => seat.id === id);
  }

  async updateSeat(id, value) {
    const newData = {
      isBooked: value.isBooked,
    };

    await this.database.ref().child(ROUTE).child(id).update(newData);

    return newData;
  }

  /* ----------------HELPER FUNCTIONS---------------- */

  _formatSnapshot(snapshotVal) {
    return Object.entries(snapshotVal)
        .map(([id, value]) => {
          return {
            id,
            isBooked: value.isBooked,
          };
        });
  }

  _initDatabase(seats) {
    const dbRef = this.database.ref().child(ROUTE);

    seats.forEach((seat) => {
      dbRef.child(seat.id).set({
        isBooked: seat.isBooked,
      });
    });
  }
}

module.exports = SampleDB;
