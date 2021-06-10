const time = require("../../utils/time");
const logger = require("../../utils/logger");
const timeout = require("../bookingTimeout");
const {
  SEATS, BOOKINGS, AREAS,
  FREE, BOOKED, BREAK,
} = require("../../utils/constants");

// Break Limit Constraints
const MIN_BREAK_WAIT = 36000000; // 1hr in ms

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

    // Update seat table and booking table ATOMICALLY
    const updates = {
      [`/areas/${areaId}/current`]: current + 1,
      [`/bookings/${userId}`]: bookingUpdate,
      [`/seats/${seatId}/userId`]: userId,
      [`/seats/${seatId}/status`]: BOOKED,
    };
    this.database.update(updates);

    // Add a timeout for removing the booking automatically
    timeout.createTimeout(userId, startTime.getTime(), endTime.getTime(), this);

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

    // Update seat table and booking table ATOMICALLY
    const updates = {
      [`/areas/${areaId}/current`]: current - 1,
      [`/bookings/${userId}`]: null, // delete
      [`/seats/${seatId}/userId`]: null, // delete
      [`/seats/${seatId}/status`]: FREE,
    };
    this.database.update(updates);

    // Remove the timeout before it executes again
    timeout.removeTimeout(userId);

    return { success: true };
  }

  async setBreak(userId, startTime, endTime) {
    const booking = await this.getBooking(userId);
    if (booking === null) {
      return { success: false, error: "BookingNotFoundError" };
    }

    const {
      seatId, endTime: bookingEndTime, breakInfo: { lastEndTime },
    } = booking;

    // Break should not be rescheduled too soon
    const sinceLastBooking = startTime - lastEndTime;
    if (sinceLastBooking < MIN_BREAK_WAIT) {
      return { success: false, error: "BreakTooRecentError" };
    }

    // Set an upper bound on the break end time, so that break doesn't go
    // past the end of the booking
    if (bookingEndTime < endTime) {
      endTime = bookingEndTime - 10000; // Add buffer of 10 sec for safety
    }

    const updates = {
      [`/seats/${seatId}/status`]: BREAK,
      [`/bookings/${userId}/breakInfo/startTime`]: startTime,
      [`/bookings/${userId}/breakInfo/endTime`]: endTime,
    };
    this.database.update(updates);

    return { success: true, startTime, endTime };
  }

  async finishBreak(userId) {
    const booking = await this.getBooking(userId);

    if (booking === null) {
      return { success: false, error: "BookingNotFoundError" };
    }

    const { seatId, breakInfo: { endTime } } = booking;

    const updates = {
      [`/seats/${seatId}/status`]: BOOKED,
      [`/bookings/${userId}/breakInfo/startTime`]: null, // delete
      [`/bookings/${userId}/breakInfo/endTime`]: null, // delete
      [`/bookings/${userId}/breakInfo/lastEndTime`]: endTime,
    };

    this.database.update(updates);

    return { success: true };
  }
}

module.exports = SeatsDB;
