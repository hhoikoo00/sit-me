import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAreaDetail, getBooking } from "../utils/DataFetcher";

import AreaTable from "../components/AreaTable/AreaTable";
import HomePageArrow from "../components/Home/HomePageArrow";
import CodeOrStatusButton from "../components/SeatStatus/CodeOrStatusButton";

const AreaStatusPage = ({ user }) => {
  const areaId = useParams().id;
  const [areaInfo, setAreaInfo] = useState({
    areaId: "",
    areaName: "",
    currentNumber: 0,
    capacity: 0,
    seats: [],
  });

  const [currBooking, setCurrBooking] = useState("");

  const paddedDivStyle = {
    margin: "10vh 10vw",
  };

  const titleStyle = {
    fontSize: "6vw",
  };

  useEffect(() => {
    (async () => {
      const areaData = await getAreaDetail(areaId);
      setAreaInfo(areaData);
    })();

    (async () => {
      console.log(user);
      const booking = await getBooking(user);
      if (booking.hasBooked) {
        setCurrBooking(booking.seatId);
      }
    })();
  }, []);

  document.body.style = "background: rgb(245, 245, 245)";

  return (
    <div style={paddedDivStyle}>
      <HomePageArrow margin={"0"} />
      <div style={titleStyle}> {areaInfo.areaName}</div>
      <AreaTable areaInfo={areaInfo} />
      <CodeOrStatusButton seatId={currBooking} />
    </div>
  );
};

export default AreaStatusPage;
