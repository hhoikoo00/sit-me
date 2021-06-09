import React from "react";

const TimeScreen = ({ startTime, endTime, seatStatus }) => {
  const bookingStatusStyle = {
    width: "80vw",
    maxWidth: "auto",
    height: "auto",
    margin: "10vw auto",
    textAlign: "center",
    fontSize: "5vw",
    border: "2px solid #F66666",
    borderRadius: "20px",
    borderColor: "white",
    background: "white",
  };

  return (
    <main className="bookingStatus" style={bookingStatusStyle}>
      <h1 className="time">
        {startTime} - {endTime}
      </h1>
      <h3 className="seatStatus">Status: {seatStatus}</h3>
    </main>
  );
};

export default TimeScreen;
