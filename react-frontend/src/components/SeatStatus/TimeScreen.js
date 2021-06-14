import React from "react";

const formatTime = (date) => {
  const formatTimeVal = (timeVal) =>
    timeVal.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

  const hours = formatTimeVal(date.getHours());
  const minutes = formatTimeVal(date.getMinutes());

  return `${hours}:${minutes}`;
};

const TimeScreen = ({ oTitle, startTime, endTime, seatStatus }) => {
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
  const dispSeatStatus = seatStatus === "BREAK" ? "Break" : "Studying";
  const timeLeft = (() => {
    const diff = (endTime - new Date().getTime()) / 60000;
    return Math.round(diff);
  })();

  const startStamp = formatTime(new Date(startTime));
  const endStamp = formatTime(new Date(endTime));

  return (
    <main className="bookingStatus" style={bookingStatusStyle}>
      {oTitle ? (<h4>Your Booking</h4>) : <div />}
      <h1 className="time">
        {startStamp} - {endStamp}
      </h1>
      <h6>
        Remaining: {timeLeft} minutes
      </h6>
      <h3 className="seatStatus">Status: {dispSeatStatus}</h3>
    </main>
  );
};

export default TimeScreen;
