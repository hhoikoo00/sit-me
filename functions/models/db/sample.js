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

/**
 * A class used to model database transactions
 */
class SampleDB {
  /**
   * Constructor for accessing the database from the server
   * @param {Server} server server object
   */
  constructor(server) {
    this.database = server.fetchDatabase();
  }

  /**
   * Get all seats in the system. Additionally, if the database is initially
   * empty, populated with a predefined set of seats SEATS (for demo purposes)
   * @return {Array} of seat entries
   */
  async getAllSeats() {
    let snapshot = await this.database.ref().child(ROUTE).get();

    // if empty, initialize database and refetch from database
    if (!snapshot.exists()) {
      this._initDatabase(SEATS);
      snapshot = await this.database.ref().child(ROUTE).get();
    }

    return this._formatSnapshot(snapshot.val());
  }

  /**
   * Get the seat in the system with a matching id. ABSOLUTELY NO ERROR HANDLING
   * @param {String} id identifier for the seats
   * @return {Object} Seat found (undefined if not found)
   */
  async getSeat(id) {
    const snapshot = await this.database.ref().child(ROUTE).get();
    return this._formatSnapshot(snapshot.val())
        .find((seat) => seat.id === id);
  }

  /**
   * Updates information about the seat. ABSOLUTELY NO ERROR HANDLING
   * @param {String} id id of the seat (assume exists in DB)
   * @param {Object} value value to update the seat object to
   * @return {Object} data that was used to update
   */
  async updateSeat(id, value) {
    const newData = {
      isBooked: value.isBooked,
    };

    await this.database.ref().child(ROUTE).child(id).update(newData);

    return newData;
  }

  /* ----------------HELPER FUNCTIONS---------------- */

  /**
   * Helper function to format the firebase snapshot into an array of JSON
   * @param {Object} snapshotVal firebase database snapshot
   * @return {Array} array of formatted snapshots
   */
  _formatSnapshot(snapshotVal) {
    return Object.entries(snapshotVal)
        .map(([id, value]) => {
          return {
            id,
            isBooked: value.isBooked,
          };
        });
  }

  /**
   * Initializes the database with the given <seats> array of objects.
   * @param {Array} seats Given array of seats
   */
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
