import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAreaDetail, getBooking } from "../utils/DataFetcher";

import HomePageArrow from "../components/Home/HomePageArrow";
import CodeOrStatusButton from "../components/SeatStatus/CodeOrStatusButton";
import ErrorBox from "../components/ErrorBox";
import { createListener } from "../utils/EventListeners";
import { MapInteractionCSS } from "react-map-interaction";

const SeatMarker = ({ location, isBooked, code, setSelectedCode }) => {
  const seatStyle = {
    width: "2.5vw",
    height: "2.5vw",
    backgroundColor: isBooked ? "red" : "green",
    borderRadius: "100%",
    border: "2px solid black",
    position: "absolute",
    top: location.y,
    left: location.x,
  };

  const setCode = () => {
    setSelectedCode(code);
  };

  return <div style={seatStyle} onTouchStart={setCode} onClick={setCode}/>;
};

const SeatMarkers = ({ areaInfo, setSelectedCode }) =>
  areaInfo.seats.map(({ seatId, location, isBooked }) => (
    <SeatMarker
      key={seatId}
      location={location}
      isBooked={isBooked}
      code={seatId}
      setSelectedCode={setSelectedCode}
    />
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

  const [selectedCode, setSelectedCode] = useState("");

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

  const codeBoxStyle = {
    fontSize: "5vw",
    width: "79vw",
    border: "1px solid black",
    padding: "2vw 0",
    margin: "auto",
    textAlign: "center",
  };

  const borderMapStyle = {
    height: "60vh",
    border: "2px solid black",
  };

  return (
    <div style={paddedDivStyle}>
      <HomePageArrow margin={"0"} />
      <ErrorBox message={error} />
      <div style={titleStyle}> {areaInfo.areaName}</div>
      <div style={borderMapStyle}>
        <MapInteractionCSS style={mapDivStyle}>
          <div>
            <img src={areaInfo.map} alt="Area Map" />
            <SeatMarkers
              areaInfo={areaInfo}
              setSelectedCode={setSelectedCode}
            />
          </div>
        </MapInteractionCSS>
      </div>
      <div style={codeBoxStyle}>
        <b>Code</b>: {selectedCode}{" "}
      </div>
      <CodeOrStatusButton seatId={currBooking} />
    </div>
  );
};

export default AreaMapPage;
