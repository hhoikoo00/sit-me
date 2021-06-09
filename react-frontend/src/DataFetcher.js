import axios from "axios";

const apiURL =
  "https://europe-west2-imperial-drp-sit-me.cloudfunctions.net/api";

const attemptLogin = async (shortcode, password) =>
  axios
    .post(apiURL + "/login", {
      shortcode: shortcode,
      password: password,
    })
    .then((res) => res.data);

const getAllAreas = async () =>
  axios.get(apiURL + "/area").then((res) => res.data);

const getAreaDetail = async (code) =>
  axios.get(apiURL + "/area/detail/" + code).then((res) => res.data);

const getSeatInfo = async (id) =>
  axios.get(apiURL + `/booking/seat/${id}`).then((res) => res.data);

const bookSeat = async (seatId, userId, duration) =>
  axios.post(apiURL + "/booking/", { seatId, userId, duration });

const cancelBooking = async (userId) =>
  axios.delete(apiURL + "/booking/" + userId);

export { attemptLogin, getAllAreas, getAreaDetail, getSeatInfo, bookSeat, cancelBooking };
