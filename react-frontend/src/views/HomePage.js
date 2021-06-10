import React, { useEffect, useState } from "react";
import { getAllAreas, getBooking, getSeatInfo } from "../utils/DataFetcher";

import HomeAreaTable from "../components/Home/HomeAreaTable";
import CodeOrStatusButton from "../components/SeatStatus/CodeOrStatusButton";
import TimeScreen from "../components/SeatStatus/TimeScreen";

const HomePage = ({ user }) => {
  const [areaInfo, setAreaInfo] = useState([]);
  const [currBooking, setCurrBooking] = useState("");

  const [seatInfo, setSeatInfo] = useState({
    seatId: "",
    isBooked: false,
    userId: "",
    startTime: 0,
    endTime: 0,
    areaName: "",
  });

  const paddedDivStyle = {
    margin: "10vh 10vw",
    maxWidth: "100%",
  };

  const titleStyle = {
    fontSize: "6vw",
  };

  useEffect(() => {
    (async () => {
      const areaData = await getAllAreas();
      setAreaInfo(areaData);
    })();

    (async () => {
      const booking = await getBooking(user);
      if (booking.hasBooked) {
        setCurrBooking(booking.seatId);
        const seatData = await getSeatInfo(booking.seatId);
        setSeatInfo(seatData);
      }
    })();
  }, []);

  document.body.style = "background: rgb(245, 245, 245)";

  return (
    <div style={paddedDivStyle}>
      <div style={titleStyle}>Current Status</div>
      {currBooking !== "" ? (
        <TimeScreen
          oTitle={"Your Booking"}
          startTime={seatInfo.startTime}
          endTime={seatInfo.endTime}
          seatStatus={"Yours!"}
        />
      ) : (
        <div />
      )}
      <HomeAreaTable areaInfo={areaInfo} />
      <CodeOrStatusButton seatId={currBooking} />
    </div>
  );
};

export default HomePage;
