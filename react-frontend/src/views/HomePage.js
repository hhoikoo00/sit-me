import React, { useEffect, useState } from "react";
import { getAllAreas, getBooking } from "../utils/DataFetcher";

import HomeAreaTable from "../components/Home/HomeAreaTable";
import EnterCodeButton from "../components/EnterCode/EnterCodeButton";
import SeatStatusButton from "../components/SeatStatus/SeatStatusButton";

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
    (async () => {
      const areaData = await getAllAreas();
      setAreaInfo(areaData);
    })();

    (async () => {
      const booking = await getBooking(user);
      if (booking.hasBooked) {
        setCurrBooking(booking.seatId);
      }
    })();
  }, []);

  document.body.style = "background: rgb(245, 245, 245)";

  return (
    <div style={paddedDivStyle}>
      <div style={titleStyle}>Current Status</div>
      <HomeAreaTable areaInfo={areaInfo} />
      {
        currBooking === "" ?
          <EnterCodeButton /> :
          <SeatStatusButton seatId={currBooking} />
      }
    </div>
  );
};

export default HomePage;
