import axios from "axios";

const apiURL =
  "https://europe-west2-imperial-drp-sit-me.cloudfunctions.net/api";

const attemptLogin = async (shortcode, password) => {
  const res = await axios
      .post(`${apiURL}/login`, {
        shortcode,
        password,
      })
      .then((res) => res.data)
      .catch((err) => ({
        error: err.response.data.error,
      }));
  return res;
};

const getAllAreas = async () => {
  const res = await axios
      .get(`${apiURL}/area`)
      .then((res) => res.data)
      .catch((err) => ({
        error: err.response.data.error,
      }));
  return res;
};

const getAreaDetail = async (code) => {
  const res = await axios
      .get(`${apiURL}/area/detail/${code}`)
      .then((res) => res.data)
      .catch((err) => ({
        error: err.response.data.error,
      }));
  return res;
};

const getSeatInfo = async (id) => {
  const res = await axios
      .get(`${apiURL}/booking/seat/${id}`)
      .then((res) => res.data)
      .catch((err) => ({
        error: err.response.data.error,
      }));
  return res;
};

const getBooking = async (userId) => {
  const res = await axios
      .get(`${apiURL}/booking/user/${userId}`)
      .then((res) => res.data)
      .catch((err) => ({
        error: err.response.data.error,
      }));
  return res;
};

const bookSeat = async (seatId, userId, duration) => {
  const res = await axios
      .post(`${apiURL}/booking`, {
        seatId,
        userId,
        duration,
      })
      .then((res) => res.data)
      .catch((err) => ({
        error: err.response.data.error,
      }));
  return res;
};

const cancelBooking = async (userId) => {
  const res = await axios
      .delete(`${apiURL}/booking/${userId}`)
      .then(() => ({}))
      .catch((err) => ({
        error: err.response.data.error,
      }));
  return res;
};

const takeBreak = async (userID, duration) => {
  const res = await axios
      .put(`${apiURL}/booking/break/${userID}`, {
        userId: userID,
        duration: duration,
      })
      .then((res) => res.data)
      .catch((err) => ({
        error: err.response.data.error,
      }));
  return res;
};

const endBreak = async (userID) => {
  const res = await axios
      .delete(`${apiURL}/booking/break/${userID}`)
      .then({})
      .catch((err) => ({
        error: err.response.data.error,
      }));
  return res;
};

const pingSeat = async (seatId) => {
  const res = await axios
      .post(`${apiURL}/booking/ping/${seatId}`)
      .then({})
      .catch((err) => ({
        error: err.response.data.error,
      }));
  return res;
};

const reportSeat = async (seatId) => {
  const res = await axios
      .post(`${apiURL}/booking/report/${seatId}`)
      .then({})
      .catch((err) => ({
        error: err.response.data.error,
      }));
  return res;
};
export {
  attemptLogin,
  getAllAreas,
  getAreaDetail,
  getSeatInfo,
  bookSeat,
  cancelBooking,
  getBooking,
  takeBreak,
  endBreak,
  pingSeat,
  reportSeat,
};
