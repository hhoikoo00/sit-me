import React, { useState } from "react";
import { useHistory } from "react-router";
import "../../css/index.css";
import { getSeatInfo } from "../../DataFetcher";
import HomePageArrow from "../homePage/HomePageArrow";

const EnterCodePage = () => {
  const [code, setCode] = useState("");
  const history = useHistory();

  const enterCodePageStyle = {
    width: "100vw",
    position: "absolute",
    top: "30vh",
    textAlign: "center",
  };

  const submitButtonStyle = {
    display: "block",
    margin: "40px auto",
    textAlign: "center",
    border: "2px solid #979797",
    padding: "20px 15px",
    width: "200px",
    outline: "none",
    color: "white",
    borderRadius: "1000px",
    borderColor: "#03DAC5",
    background: "#03DAC5",
    fontSize: "1.2rem",
  };

  const enterCodeField = {
    border: "0",
    background: "white",
    display: "block",
    margin: "20px auto",
    textAlign: "left",
    borderRadius: "14px",
    padding: "23px 10px",
    width: "200px",
    outline: "none",
    color: "black",
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      const seatData = await getSeatInfo(code);
      if (seatData.isBooked) {
          alert ("This seat is already booked! Please find another!");
          setCode("");
      } else {
          history.push("/bookSeat/"+code)
      }
  }

  return (
    <div className="enterCodePage">
      <HomePageArrow margin="10%"/>
      {/* <button className="backButton"></button> */}
      <div className="EnterCodeSection" style={enterCodePageStyle}>
        <form action="seatCodeSubmission" onSubmit={handleSubmit}>
          <input
            type="text"
            id="enterCode"
            className="enterCode"
            placeholder="Enter Code"
            value={code}
            onChange={(e)=>setCode(e.target.value)}
            style={enterCodeField}
          />
          <button type="submit" value="SUBMIT" style={submitButtonStyle}> SUBMIT </button>
        </form>
      </div>
    </div>
  );
};

export default EnterCodePage;
