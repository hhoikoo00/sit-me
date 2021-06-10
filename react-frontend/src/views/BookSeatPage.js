import { React, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { bookSeat, getSeatInfo } from "../utils/DataFetcher";

import DropDownMenu from "../components/BookSeat/DropDownMenu";

const BookSeatPage = ({ user }) => {
  const history = useHistory();
  const seatId = useParams().seatCode;

  const [seatInfo, setSeatInfo] = useState({
    seatId: "",
    isBooked: false,
    areaName: "",
  });
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

  const buttonsContainerStyle = {
    margin: "40vw auto",
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
    (async () => {
      const seatData = await getSeatInfo(seatId);
      if (seatData.isBooked) {
        alert(`Seat: ${seatId}  is already booked! Please find another!`);
        history.push("/entercode");
      } else {
        setSeatInfo(seatData);
      }
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await bookSeat(seatId, user, parseFloat(hour * 60) + parseFloat(minutes));
    history.push("/seatStatus/" + seatId);
  };

  return (
    <div className="bookingHoursPage">
      <div className="bookingInfo" style={bookingInfoStyle}>
        <h1>Booking</h1>
        <h3>{seatInfo.areaName}</h3>
        <h4 className="seatInfo">{seatInfo.seatId}</h4>
      </div>

      <div style={timeInfoStyle}>
        <DropDownMenu
          val={hour}
          setVal={setHour}
          vals={["0", "1", "2"]}
          label="HOURS"
        />

        <DropDownMenu
          val={minutes}
          setVal={setMinutes}
          vals={["0", "15", "30", "45"]}
          label="MINUTES"
        />
      </div>

      <div className="buttonsContainer" style={buttonsContainerStyle}>
        <button
          type="button"
          value="SUBMIT"
          style={submitButtonStyle}
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
        <Link style={linkStyle} to="/entercode">
          <button type="button" style={cancelButtonStyle}>
            CANCEL
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BookSeatPage;