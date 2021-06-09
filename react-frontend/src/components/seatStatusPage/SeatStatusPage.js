import { React, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { cancelBooking, getSeatInfo } from "../../DataFetcher";
import "../../css/index.css";
import TimeScreen from "./TimeScreen";
import ButtonScreen from "./ButtonScreen";

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

  const formatTimeVal = (timeVal) =>
    timeVal.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

  const startTime = `${formatTimeVal(startDate.getHours())}:${formatTimeVal(
      startDate.getMinutes(),
  )}`;
  const endTime = `${formatTimeVal(endDate.getHours())}:${formatTimeVal(
      endDate.getMinutes(),
  )}`;

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

  const cancelSeat = (event) => {
    event.preventDefault();
    cancelBooking(user);
    goHome();
  };

  const goHome = () => {
    history.push("/");
  };

  return (
    <div className="statusPage" style={statusPageStyle}>
      <div className="bookedInfo" style={bookedInfoStyle}>
        <h1>Seat Booked</h1>
        <h3 className="seatInfo">{seatInfo.seatId}</h3>
      </div>

      <TimeScreen
        startTime={startTime}
        endTime={endTime}
        seatStatus={seatStatus}
      />

      <ButtonScreen isMine={isMine} cancelSeat={cancelSeat} goHome={goHome} />
    </div>
  );
};

export default SeatStatusPage;
