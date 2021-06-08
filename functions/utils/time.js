const MILLIS_TO_MIN = 60000;

const addMinutes = (time, duration) => {
  return new Date(time.getTime() + duration * MILLIS_TO_MIN);
};

const getTimeInUTC = (localTime) => {
  const utcTime = localTime.getTime() +
    localTime.getTimezoneOffset() * MILLIS_TO_MIN;
  return new Date(utcTime);
};

const getLocalTimeFromUTC = (utcTime) => {
  const localTime = utcTime.getTime() -
    new Date().getTimezoneOffset() * MILLIS_TO_MIN;
  return new Date(localTime);
};

module.exports = {
  addMinutes,
  getTimeInUTC,
  getLocalTimeFromUTC,
};
