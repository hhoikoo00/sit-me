import { React, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { cancelBooking, getSeatInfo } from "../utils/DataFetcher";

import TimeScreen from "../components/SeatStatus/TimeScreen";
import ButtonScreen from "../components/SeatStatus/ButtonScreen";

const SeatStatusPage = ({ user }) => {
  const seatId = useParams().seatCode;
  const history = useHistory();

  const [seatInfo, setSeatInfo] = useState({
    seatId: seatId,
    isBooked: false,
    userId: "",
    startTime: 0,
    endTime: 0,
    areaName: "",
  });
  const [seatStatus, setSeatStatus] = useState("");

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

  useEffect(() => {
    (async () => {
      const seatData = await getSeatInfo(seatId);
      if (!seatData.isBooked) {
        history.push("/bookSeat/" + seatId);
      } else {
        setSeatInfo(seatData);
      }
    })();

    setSeatStatus("Studying");
  }, []);

  const cancelSeat = async (event) => {
    event.preventDefault();

    await cancelBooking(user);
    goHome();
  };

  const goHome = () => {
    history.push("/");
  };

  return (
    <div className="statusPage" style={statusPageStyle}>
      <div className="bookedInfo" style={bookedInfoStyle}>
        <h1>Seat Booked</h1>
        <h3>{seatInfo.areaName}</h3>
        <h4 className="seatInfo">{seatInfo.seatId}</h4>
      </div>
      <TimeScreen
        startTime={seatInfo.startTime}
        endTime={seatInfo.endTime}
        seatStatus={seatStatus}
      />

      <ButtonScreen
        isMine={user === seatInfo.userId}
        cancelSeat={cancelSeat}
        goHome={goHome}
      />
    </div>
  );
};

export default SeatStatusPage;
