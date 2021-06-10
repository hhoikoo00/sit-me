import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAreaDetail, getBooking } from "../utils/DataFetcher";

import AreaTable from "../components/AreaTable/AreaTable";
import HomePageArrow from "../components/Home/HomePageArrow";
import CodeOrStatusButton from "../components/SeatStatus/CodeOrStatusButton";
import ErrorBox from "../components/ErrorBox";

const AreaStatusPage = ({ user }) => {
  const areaId = useParams().id;
  const [areaInfo, setAreaInfo] = useState({
    areaId: "",
    areaName: "",
    currentNumber: 0,
    capacity: 0,
    seats: [],
  });
  const [error, setError] = useState("");

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
      if ("error" in areaData) {
        setError(areaData.error);
      } else {
        setAreaInfo(areaData);
      }
    })();

    (async () => {
      console.log(user);
      const booking = await getBooking(user);
      if ("error" in booking) {
        setError(booking.error);
      } else {
        if (booking.hasBooked) {
          setCurrBooking(booking.seatId);
        }
      }
    })();
  }, []);

  document.body.style = "background: rgb(245, 245, 245)";

  return (
    <div style={paddedDivStyle}>
      <HomePageArrow margin={"0"} />
      <ErrorBox message={error} />
      <div style={titleStyle}> {areaInfo.areaName}</div>
      <AreaTable areaInfo={areaInfo} />
      <CodeOrStatusButton seatId={currBooking} />
    </div>
  );
};

export default AreaStatusPage;
