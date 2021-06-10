const time = require("../../utils/time");
const logger = require("../../utils/logger");
const {
  SEATS, BOOKINGS, AREAS,
  FREE, BOOKED, BREAK,
} = require("../../utils/constants");

class SeatsDB {
  constructor(server) {
    this.database = server.fetchDatabase().ref();
    this.seats = this.database.child(SEATS);
    this.bookings = this.database.child(BOOKINGS);
    this.areas = this.database.child(AREAS);
  }

  async getSeat(seatId) {
    const snapshot = await this.seats.child(seatId).get();
    if (!snapshot.exists()) {
      return null;
    }

    const seat = {
      ...snapshot.val(),
      seatId,
    };

    return seat;
  }

  async getBooking(userId) {
    const snapshot = await this.bookings.child(userId).get();
    if (!snapshot.exists()) {
      return null;
    }

    const booking = {
      ...snapshot.val(),
      userId,
    };
    return booking;
  }

  async book(userId, seatId, startTime, endTime) {
    // Check if the seat does not already exist
    const seat = await this.getSeat(seatId);
    if (seat === null) {
      return { success: false, error: "SeatNotFoundError" };
    }

    // Check if the given user has already booked another seat
    const booking = await this.getBooking(userId);
    if (booking !== null) {
      return { success: false, error: "BookingExistsAlreadyError" };
    }

    // Check if the seat is already booked
    if (seat.status === BOOKED || seat.status === BREAK) {
      const bookedUserId = seat.userId;
      const existingBooking = await this.getBooking(bookedUserId);
      const utcEndTime = new Date(existingBooking.endTime);
      const endTime = time.getLocalTimeFromUTC(utcEndTime);

      // Check if the booking has expired already (just in case)
      if (endTime.getTime() < new Date().getTime()) {
        // If booking stale remove it
        await this.unbook(bookedUserId);

        // Issue warning as this should never happen if system works correctly
        logger.error(
            `WARNING: stale booking removed for seat ${seat.id}`,
            `for user ${bookedUserId}`,
        );
      } else {
        // Seat already booked
        return { success: false, error: "SeatAlreadyBookedError" };
      }
    }

    const areaId = seat.location.areaId;
    const area = await this.areas.child(areaId).get();
    const current = Number(area.val().current);

    const bookingUpdate = {
      seatId,
      startTime: startTime.getTime(),
      endTime: endTime.getTime(),
    };

    const updates = {
      [`/areas/${areaId}/current`]: current + 1,
      [`/bookings/${userId}`]: bookingUpdate,
      [`/seats/${seatId}/userId`]: userId,
      [`/seats/${seatId}/status`]: BOOKED,
    };

    // Update seat table and booking table ATOMICALLY
    this.database.update(updates);

    return { success: true };
  }

  async unbook(userId) {
    // Check if booking does not exist
    const booking = await this.getBooking(userId);
    if (booking === null) {
      return { success: false, error: "BookingNotFoundError" };
    }

    const { seatId } = booking;

    const seat = await this.getSeat(seatId);
    const areaId = seat.location.areaId;
    const area = await this.areas.child(areaId).get();
    const current = Number(area.val().current);

    const updates = {
      [`/areas/${areaId}/current`]: current - 1,
      [`/bookings/${userId}`]: null, // delete
      [`/seats/${seatId}/userId`]: null, // delete
      [`/seats/${seatId}/status`]: FREE,
    };

    // Update seat table and booking table ATOMICALLY
    this.database.update(updates);

    return { success: true };
  }
}

module.exports = SeatsDB;
