import React from "react";
import { Link } from "react-router-dom";

const CodeOrStatusButton = ({ seatId }) => {
  const buttonStyle = {
    display: "block",
    textAlign: "center",
    border: "2px solid #03DAC5",
    padding: "20px 15px",
    width: "200px",
    outline: "none",
    color: "white",
    borderRadius: "1000px",
    borderColor: "#03DAC5",
    background: "#03DAC5",
    fontSize: "1rem",
    margin: "8px auto",
  };

  if (seatId === "") {
    return (
      <Link to="/entercode" style={{ textDecoration: "none" }}>
        <button type="button" style={buttonStyle}>
          ENTER SEAT CODE
        </button>
      </Link>
    );
  } else {
    return (
      <Link to={"/seatStatus/" + seatId} style={{ textDecoration: "none" }}>
        <button type="button" style={buttonStyle}>
          VIEW BOOKING
        </button>
      </Link>
    );
  }
};

export default CodeOrStatusButton;
