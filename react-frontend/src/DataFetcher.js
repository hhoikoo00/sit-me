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

const getAllAreas = async() =>
    axios
      .get(apiURL + "/area")
      .then(res => res.data);

const getAreaDetail = async(code) =>
    axios
      .get(apiURL + "/area/detail/" + code)
      .then(res => {
        console.log(apiURL + "/area/detail/" + code)
        return res.data}
        )

export { attemptLogin, getAllAreas, getAreaDetail };
