import { React, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import "../../css/index.css";
import { bookSeat, getSeatInfo } from "../../DataFetcher";

const BookSeatPage = ({ user }) => {
  const history = useHistory();
  const seatId = useParams().seatCode;
  const [seatInfo, setSeatInfo] = useState({});
  const [hour, setHour] = useState(1);
  const [minutes, setMinutes] = useState(0);

  const bookingInfoStyle = {
    width: "50vw",
    maxWidth: "auto",
    height: "auto",
    margin: "10vw 25vw",
    textAlign: "center",
    fontSize: "5vw",
  };

  const timeInfoStyle = {
    width: "50vw",
    maxWidth: "2000px",
    height: "auto",
    textAlign: "center",
    display: "flex",
    justifyContent: "spaceBetween",
    fontSize: "1.3rem",
    margin: "25vw auto",
  };

  const selectDurationStyle = {
    display: "inlineBlock",
    flex: "1",
    padding: "0.5vw 0.5vw",
  };

  const selectBoxStyle = {
    width: "25vw",
    height: "8vw",
    borderRadius: "10px",
    background: "white",
    border: "0",
  };

  const labelStyle = {
    position: "absolute",
    transform: "translate(0px, -5.8vw)",
    fontSize: "1.1rem",
  };

  const buttonsContainerStyle = {
    margin: "40vw auto",
  };

  const submitButtonStyle = {
    display: "block",
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
    margin: "8px auto",
  };

  const linkStyle = {
    textDecoration: "none",
  };

  const cancelButtonStyle = {
    display: "block",
    textAlign: "center",
    border: "2px solid #F66666",
    padding: "20px 15px",
    width: "200px",
    outline: "none",
    color: "white",
    borderRadius: "1000px",
    borderColor: "#F66666",
    background: "#F66666",
    fontSize: "1.2rem",
    margin: "8px auto",
  };

  useEffect(() => {
    const fetchData = async () => {
      const seatData = await getSeatInfo(seatId);
      if (seatData.isBooked) {
        alert(`Seat: ${seatId}  is already booked! Please find another!`);
        history.push("/entercode");
      } else {
        setSeatInfo(seatData);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await bookSeat(seatId, user, parseFloat(hour * 60) + parseFloat(minutes));
    history.push("/seatStatus/"+ seatId)
  };

  return (
    <div className="bookingHoursPage">
      <div className="bookingInfo" style={bookingInfoStyle}>
        <h1>Booking</h1>
        <h3 className="seatInfo">{seatInfo.seatId}</h3>
      </div>

      <div className="timeInfo" style={timeInfoStyle}>
        <div className="selectHours" style={selectDurationStyle}>
          <label style={labelStyle}>HOURS</label>
          <select
            name="hours"
            id="hours"
            style={selectBoxStyle}
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div className="selectMinutes" style={selectDurationStyle}>
          <label style={labelStyle}>MINUTES</label>
          <select
            name="minutes"
            id="minutes"
            style={selectBoxStyle}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          >
            <option value="0">0</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
          </select>
        </div>
      </div>

      <div className="buttonsContainer" style={buttonsContainerStyle}>
        <input
          type="submit"
          value="SUBMIT"
          style={submitButtonStyle}
          onClick={handleSubmit}
        />
        <Link style={linkStyle} to="/entercode">
          <button type="button" style={cancelButtonStyle}>
            {" "}
            CANCEL
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BookSeatPage;
