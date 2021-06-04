const logger = require("../utils/logger");

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
class Database {
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
    const snapshot = await this.database.ref().child(ROUTE).get();
    logger.info(snapshot);

    // if empty initialize database
    if (!snapshot.exists()) {
      this._initDatabase(SEATS);
    }

    const seats = this._formatSnapshot(snapshot.val());
    logger.info(seats);
    return seats;
  }

  /**
   * Get the seat in the system with a matching id. ABSOLUTELY NO ERROR HANDLING
   * @param {String} id identifier for the seats
   * @return {Object} Seat found (undefined if not found)
   */
  async getSeat(id) {
    const snapshot = await this.database.ref().child(ROUTE).get();
    logger.info(snapshot);

    const seat = this._formatSnapshot(snapshot.val())
        .find((seat) => seat.id === id);
    logger.info(seat);
    return seat;
  }

  /**
   * Updates information about the seat. ABSOLUTELY NO ERROR HANDLING
   * @param {String} id id of the seat (assume exists in DB)
   * @param {Object} value value to update the seat object to
   * @return {Object} data that was used to update
   */
  async updateSeat(id, value) {
    const newData = {
      isAvailable: value.isAvailable,
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
            isAvailable: value.isAvailable,
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
        isAvailable: seat.isAvailable,
      });
    });
  }
}

module.exports = Database;
