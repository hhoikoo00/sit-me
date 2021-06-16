import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAreaDetail, getBooking } from "../utils/DataFetcher";

import HomePageArrow from "../components/Home/HomePageArrow";
import CodeOrStatusButton from "../components/SeatStatus/CodeOrStatusButton";
import ErrorBox from "../components/ErrorBox";
import { createListener } from "../utils/EventListeners";
import { MapInteractionCSS } from "react-map-interaction";

const SeatMarker = ({ location, isBooked }) => {
  const seatStyle = {
    width: "25vw",
    height: "25vw",
    backgroundColor: isBooked ? "red" : "green",
    borderRadius: "100%",
    border: "2px solid black",
    position: "absolute",
    top: location.y,
    left: location.x,
  };

  return <div style={seatStyle} />;
};

const SeatMarkers = ({ areaInfo }) =>
  areaInfo.seats.map(({ seatId, location, isBooked }) => (
    <SeatMarker key={seatId} location={location} isBooked={isBooked} />
  ));

const AreaMapPage = ({ user }) => {
  const areaId = useParams().id;
  const [areaInfo, setAreaInfo] = useState({
    areaId: "",
    areaName: "",
    currentNumber: 0,
    capacity: 0,
    seats: [],
    map: "",
  });
  const [error, setError] = useState("");

  const [currBooking, setCurrBooking] = useState("");

  const paddedDivStyle = {
    margin: "10vh 10vw",
  };

  const titleStyle = {
    fontSize: "6vw",
  };

  const fetchAreaData = async () => {
    const areaData = await getAreaDetail(areaId);
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
      }
    }
  };

  useEffect(() => {
    createListener(fetchAreaData);
    fetchAreaData();
    fetchBookingData();
  }, []);

  document.body.style = "background: rgb(245, 245, 245)";

  const mapDivStyle = {
    width: "80vw",
    height: "30vh",
    backgroundColor: "white",
    overflow: "scroll",
  };

  const borderMapStyle = { height: "60vh", border: "2px solid black" };

  return (
    <div style={paddedDivStyle}>
      <HomePageArrow margin={"0"} />
      <ErrorBox message={error} />
      <div style={titleStyle}> {areaInfo.areaName}</div>
      <div style={borderMapStyle}>
        <MapInteractionCSS style={mapDivStyle}>
          <div>
            <img src={areaInfo.map} alt="Area Map" />
            <SeatMarkers areaInfo={areaInfo} />
          </div>
        </MapInteractionCSS>
      </div>
      <CodeOrStatusButton seatId={currBooking} />
    </div>
  );
};

export default AreaMapPage;
