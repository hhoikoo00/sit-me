import React, { useEffect, useState } from "react";
import { getAllAreas, getBooking } from "../../DataFetcher";
import "../../css/index.css";
import HomeAreaTable from "./HomeAreaTable";
import EnterCodeButton from "../enterCodePage/EnterCodeButton";
import SeatStatusButton from "../seatStatusPage/SeatStatusButton";

const HomePage = ({ user }) => {
  const [areaInfo, setAreaInfo] = useState([]);
  const [currBooking, setCurrBooking] = useState("");

  const paddedDivStyle = {
    margin: "10vh 10vw",
    maxWidth: "100%",
  };

  const titleStyle = {
    fontSize: "6vw",
  };

  useEffect(() => {
    const fetchAreaData = async () => {
      const areaData = await getAllAreas();
      const newAreaInfo = [];

      areaData.forEach((entry) => newAreaInfo.push(entry));
      setAreaInfo(newAreaInfo);
    };

    const fetchUserBooking = async () => {
      getBooking(user).then((booking) => {
        console.log(booking);
        if (booking.hasBooked) {
          setCurrBooking(booking.seatId);
        }
      });
    };
    fetchAreaData();
    fetchUserBooking();
  }, []);
  document.body.style = "background: rgb(245, 245, 245)";
  return (
    <div style={paddedDivStyle}>
      <div style={titleStyle}>Current Status</div>
      <HomeAreaTable areaInfo={areaInfo} />
      {currBooking === "" ? (
        <EnterCodeButton />
      ) : (
        <SeatStatusButton seatId={currBooking} />
      )}
    </div>
  );
};
export default HomePage;
