const MILLIS_TO_MIN = 60000;

const getTimeInUTC = (localTime) => {
  const utcTime = localTime.getTime() +
    localTime.getTimezoneOffset() * MILLIS_TO_MIN;
  return new Date(utcTime);
};

const addMinutes = (time, duration) => {
  return new Date(time.getTime() + duration * MILLIS_TO_MIN);
};

module.exports = {
  getTimeInUTC,
  addMinutes,
};
