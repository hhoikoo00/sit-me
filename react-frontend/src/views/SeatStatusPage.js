import { React, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  cancelBooking,
  endBreak,
  getSeatInfo,
  takeBreak,
} from "../utils/DataFetcher";

import TimeScreen from "../components/SeatStatus/TimeScreen";
import ButtonScreen from "../components/SeatStatus/ButtonScreen";
import ErrorBox from "../components/ErrorBox";

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
  const [error, setError] = useState("");

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
      if ("error" in seatData) {
        setError(seatData.error);
      } else {
        if (!seatData.isBooked) {
          history.push("/bookSeat/" + seatId);
        } else {
          setSeatInfo(seatData);
        }
      }
    })();
  }, []);

  const cancelSeat = async (event) => {
    event.preventDefault();

    const res = await cancelBooking(user);
    console.log(res);
    if ("error" in res) {
      setError(res.error);
    } else {
      goHome();
    }
  };

  const doTakeBreak = async (event) => {
    event.preventDefault();
    const res = await takeBreak(user, 15);
    if ("error" in res) {
      setError(res.error);
    } else {
      history.push("/");
    }
  };

  const doCancelBreak = async (event) => {
    event.preventDefault();
    const res = await endBreak(user);
    if ("error" in res) {
      setError(res.error);
    } else {
      history.push("/");
    }
  };

  const goHome = () => {
    history.push("/");
  };

  return (
    <div className="statusPage" style={statusPageStyle}>
      <div className="bookedInfo" style={bookedInfoStyle}>
        <ErrorBox message={error} />
        <h1>Seat Booked</h1>
        <h3>{seatInfo.areaName}</h3>
        <h4 className="seatInfo">{seatInfo.seatId}</h4>
      </div>
      <TimeScreen
        startTime={seatInfo.startTime}
        endTime={seatInfo.endTime}
        seatStatus={seatInfo.seatStatus}
      />

      <ButtonScreen
        isMine={user === seatInfo.userId}
        cancelSeat={cancelSeat}
        goHome={goHome}
        doTakeBreak={doTakeBreak}
        doCancelBreak={doCancelBreak}
        isOnBreak={seatInfo.seatStatus === "BREAK"}
      />
    </div>
  );
};

export default SeatStatusPage;
