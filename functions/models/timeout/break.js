const time = require("../../utils/time");
const { BOOKINGS } = require("../../utils/constants");

const callbacks = {};

const onStartup = (server, seats) => {
  const bookings = server.fetchDatabase().ref(BOOKINGS).get();

  Object.entries(bookings).forEach(([userId, value]) => {
    // Check if break information exists
    if (Object.prototype.hasOwnProperty.call(value, "breakInfo")) {
      const currentTime = time.getTimeInUTC(new Date()).getTime();
      const endTime = value.breakInfo.endTime;
      createTimeout(userId, currentTime, endTime, seats);
    }
  });
};

const createTimeout = (userId, startTime, endTime, seats) => {
  // Calculate remaining time and normalise it to a minimum (4ms)
  // callback is executed immediately when remaining is minimum
  const remaining = Math.max(4, endTime - startTime);

  // Set up and add callback
  const callback = setTimeout(() => seats.finishBreak(userId), remaining);
  callbacks[userId] = callback;
};

const removeTimeout = (userId) => {
  const callback = callbacks[userId];

  // Callback no longer needed, so clear it
  clearTimeout(callback);

  // Remove callback for userId from callbacks
  delete callbacks[userId];
};

module.exports = {
  onStartup,
  createTimeout,
  removeTimeout,
};
