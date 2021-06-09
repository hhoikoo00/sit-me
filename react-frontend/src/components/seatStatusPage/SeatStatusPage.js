import { React, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { cancelBooking, getSeatInfo } from "../../DataFetcher";
import "../../css/index.css";

const SeatStatusPage = ({ user }) => {
  const seatId = useParams().seatCode;
  const history = useHistory();
  const [seatInfo, setSeatInfo] = useState({
    seatId: seatId,
    isBooked: false,
    userId: "",
    startTime: 0,
    endTime: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const seatData = await getSeatInfo(seatId);
      if (!seatData.isBooked) {
        history.push("/bookSeat/" + seatId);
      } else {
        setSeatInfo(seatData);
      }
    };
    fetchData();
  }, []);

  const startDate = new Date(seatInfo.startTime);
  const endDate = new Date(seatInfo.endTime);
  const startTime = `${startDate.getHours()}:${startDate.getMinutes()}`;
  const endTime = `${endDate.getHours()}:${endDate.getMinutes()}`;

  const isMine = user === seatInfo.userId;
  const seatStatus = "Studying";

  const statusPageStyle = {
    align: "center",
  };

  const bookedInfoStyle = {
    width: "50vw",
    maxWidth: "auto",
    height: "auto",
    margin: "10vw 25vw",
    textAlign: "center",
    fontSize: "5vw",
  };

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

  const buttonsContainerStyle = {
    margin: "15vw auto",
  };

  const statusButtonStyle = {
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
    fontSize: "1.2rem",
    margin: "8px auto",
  };

  const cancelSeat = (event) => {
    event.preventDefault();
    cancelBooking(user);
    goHome();
  }

  const goHome = () => {
    history.push("/")
  }

  return (
    <div className="statusPage" style={statusPageStyle}>
      <div className="bookedInfo" style={bookedInfoStyle}>
        <h1>Seat Booked</h1>
        <h3 className="seatInfo">{seatInfo.seatId}</h3>
      </div>

      <main className="bookingStatus" style={bookingStatusStyle}>
        <h1 className="time">
          {startTime} - {endTime}
        </h1>
        <h3 className="seatStatus">Status: {seatStatus}</h3>
      </main>

      <div className="buttonsContainer" style={buttonsContainerStyle}>
        {/* <button type="button" style={statusButtonStyle}>
          15 MIN BREAK
        </button> */}

        {isMine ? (
          <button type="button" style={statusButtonStyle} onClick={cancelSeat}>
            FINISH
          </button>
        ) : (
          <div />
        )}

        <button type="button" style={statusButtonStyle} onClick={goHome}>
          HOME
        </button>
      </div>
    </div>
  );
};

export default SeatStatusPage;
