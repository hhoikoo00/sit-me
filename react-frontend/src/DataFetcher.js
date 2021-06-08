import axios from "axios";

const apiURL = "https://europe-west2-imperial-drp-sit-me.cloudfunctions.net/api";

const attemptLogin = async (shortcode, password) => axios.post(
    apiURL + "/login",
    {
        shortcode: shortcode,
        password: password
    }
)
.then(res => res.data)

const bookCancelSeat = async(code, doBook) => axios.put(`apiURL/${code}`, {
    isBooked: doBook,
  }
);

const getSeatData = async() => axios.get(apiURL);

export default { attemptLogin, bookCancelSeat, getSeatData };