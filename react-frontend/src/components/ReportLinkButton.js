import React from "react";
import { Link } from "react-router-dom";
const ReportButton = () => {
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
  return (
    <Link to="/report" style={{ textDecoration: "none" }}>
      <button type="submit" style={buttonStyle}>
        REPORT SEAT
      </button>
    </Link>
  );
};

export default ReportButton;
