import React, { useEffect, useState } from "react";
import { getAllAreas, getBooking, getSeatInfo } from "../utils/DataFetcher";

import HomeAreaTable from "../components/Home/HomeAreaTable";
import CodeOrStatusButton from "../components/SeatStatus/CodeOrStatusButton";
import TimeScreen from "../components/SeatStatus/TimeScreen";
import ErrorBox from "../components/ErrorBox";
import ReportButton from "../components/ReportLinkButton";
import { createListener } from "../utils/EventListeners";

const HomePage = ({ user }) => {
  const [areaInfo, setAreaInfo] = useState([]);
  const [currBooking, setCurrBooking] = useState("");
  const [error, setError] = useState("");

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
    maxWidth: "1500px",
  };

  const titleStyle = {
    fontSize: "6vw",
  };

  const fetchAreaData = async () => {
    const areaData = await getAllAreas();
    if ("error" in areaData) {
      setError(areaData.error);
    } else {
      setAreaInfo(areaData);
    }
  };

  const fetchBookingData = async () => {
    const booking = await getBooking(user);
    if ("error" in booking) {
      setError(booking.error);
    } else {
      if (booking.hasBooked) {
        setCurrBooking(booking.seatId);
        const seatData = await getSeatInfo(booking.seatId);
        setSeatInfo(seatData);
      }
    }
  };

  useEffect(() => {
    createListener(fetchAreaData);
    fetchAreaData();
    fetchBookingData();
    const interval = setInterval(() => {
      fetchBookingData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  document.body.style = "background: rgb(245, 245, 245)";

  return (
    <div style={paddedDivStyle}>
      <ErrorBox message={error} />
      <div style={titleStyle}>Current Status</div>
      {currBooking !== "" ? (
        <TimeScreen
          oTitle={"Your Booking"}
          startTime={seatInfo.startTime}
          endTime={seatInfo.endTime}
          seatStatus={seatInfo.seatStatus}
        />
      ) : (
        <div />
      )}
      <HomeAreaTable areaInfo={areaInfo} />
      <CodeOrStatusButton seatId={currBooking} />
      <ReportButton />
    </div>
  );
};

export default HomePage;
