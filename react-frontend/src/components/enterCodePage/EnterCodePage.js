import React, { useState } from "react";
import { useHistory } from "react-router";
import "../../css/index.css";
import { getSeatInfo } from "../../utils/DataFetcher";
import HomePageArrow from "../homePage/HomePageArrow";
import EnterCodeForm from "./EnterCodeForm";

const EnterCodePage = () => {
  const [code, setCode] = useState("");
  const history = useHistory();

  const enterCodePageStyle = {
    width: "100vw",
    position: "absolute",
    top: "30vh",
    textAlign: "center",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const seatData = await getSeatInfo(code);
    if (seatData.isBooked) {
      alert("This seat is already booked! Please find another!");
      setCode("");
    } else {
      history.push("/bookSeat/" + code);
    }
  };

  return (
    <div className="enterCodePage">
      <HomePageArrow margin="10%" />
      <div className="EnterCodeSection" style={enterCodePageStyle}>
        <EnterCodeForm
          handleSubmit={handleSubmit}
          code={code}
          setCode={setCode}
        />
      </div>
    </div>
  );
};

export default EnterCodePage;
