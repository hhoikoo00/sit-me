import React, { useState } from "react";
import { useHistory } from "react-router";
import { getSeatInfo } from "../utils/DataFetcher";

import HomePageArrow from "../components/Home/HomePageArrow";
import EnterCodeForm from "../components/EnterCode/EnterCodeForm";
import ErrorBox from "../components/ErrorBox";

const EnterCodePage = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
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
    if ("error" in seatData) {
      setError(seatData.error);
    } else {
      if (seatData.isBooked) {
        alert("This seat is already booked! Please find another!");
        history.push(`/seatStatus/${code}`);
      } else {
        history.push("/bookSeat/" + code);
      }
    }
  };

  return (
    <div className="enterCodePage">
      <HomePageArrow margin="10%" />
      <ErrorBox message={error} />
      <div className="EnterCodeSection" style={enterCodePageStyle}>
        <EnterCodeForm
          handleSubmit={handleSubmit}
          code={code}
          setCode={setCode}
          buttonDesc="BOOK SEAT"
        />
      </div>
    </div>
  );
};

export default EnterCodePage;
