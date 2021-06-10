import axios from "axios";

const apiURL =
  "https://europe-west2-imperial-drp-sit-me.cloudfunctions.net/api";

const attemptLogin = async (shortcode, password) => {
  const res = await axios.post(`${apiURL}/login`, {
    shortcode, password,
  });
  return res.data;
};

const getAllAreas = async () => {
  const res = await axios.get(`${apiURL}/area`);
  return res.data;
};

const getAreaDetail = async (code) => {
  const res = await axios.get(`${apiURL}/area/detail/${code}`);
  return res.data;
};

const getSeatInfo = async (id) => {
  const res = await axios.get(`${apiURL}/booking/seat/${id}`);
  return res.data;
};

const getBooking = async (userId) => {
  const res = await axios.get(`${apiURL}/booking/user/${userId}`);
  return res.data;
};

const bookSeat = async (seatId, userId, duration) => {
  const res = await axios.post(`${apiURL}/booking`, {
    seatId, userId, duration,
  });
  return res.data;
};

const cancelBooking = async (userId) => {
  const res = await axios.delete(`${apiURL}/booking/${userId}`);
  return res.data;
};

export {
  attemptLogin,
  getAllAreas,
  getAreaDetail,
  getSeatInfo,
  bookSeat,
  cancelBooking,
  getBooking,
};
