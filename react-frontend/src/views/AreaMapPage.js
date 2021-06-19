import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAreaDetail, getBooking } from "../utils/DataFetcher";

import HomePageArrow from "../components/Home/HomePageArrow";
import CodeOrStatusButton from "../components/SeatStatus/CodeOrStatusButton";
import ErrorBox from "../components/ErrorBox";
import { createListener } from "../utils/EventListeners";
import { MapInteractionCSS } from "react-map-interaction";
import { Link } from "react-router-dom";
import clipBoardIcon from "../assets/icons/clipboardIcon.png";

const SeatMarker = ({ location, isBooked, code, setSelectedCode }) => {
  const freeSeatStyle = {
    width: "25px",
    height: "25px",
    backgroundColor: "blue",
    borderRadius: "100%",
    border: "2px solid black",
    position: "absolute",
    top: location.y,
    left: location.x,
  };

  const bookedSeatStyle = {
    width: "25px",
    height: "25px",
    backgroundColor: "red",
    borderRadius: "100%",
    border: "2px solid black",
    position: "absolute",
    top: location.y,
    left: location.x,
  };

  const bookedHLine = {
    content: "",
    position: "absolute",
    width: "25px",
    height: "3px",
    backgroundColor: "black",
    borderRadius: "0",
    top: "11.5px",
    zIndex: "0",
  };

  const bookedVLine = {
    content: "",
    position: "absolute",
    width: "2px",
    height: "25px",
    backgroundColor: "black",
    borderRadius: "0",
    left: "11.5px",
    zIndex: "0",
  };

  const setCode = () => {
    setSelectedCode(code);
  };

  return (
    <div
      style={isBooked ? bookedSeatStyle : freeSeatStyle}
      onTouchStart={setCode}
      onClick={setCode}
    >
      <div style={isBooked ? bookedVLine : {}} />
      <div style={isBooked ? bookedHLine : {}} />
    </div>
  );
};

const SeatMarkers = ({ areaInfo, setSelectedCode }) =>
  areaInfo.seats.map(({ seatId, location, isBooked }) => {
    return (
      <SeatMarker
        key={seatId}
        location={location}
        isBooked={isBooked}
        code={seatId}
        setSelectedCode={setSelectedCode}
      ></SeatMarker>
    );
  });

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

  const [mapProperties, setMapProperties] = useState({
    scale: 0.45,
    translation: { x: -200, y: 0 },
  });

  const paddedDivStyle = {
    margin: "10vh 10vw",
  };

  const titleStyle = {
    fontSize: "6vw",
    textAlign: "center",
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

  const buttonStyle = {
    display: "block",
    textAlign: "center",
    border: "2px solid #03DAC5",
    padding: "20px 15px",
    width: "200px",
    outline: "none",
    color: "white",
    borderRadius: "1000px",
    borderColor: "#03DAC5",
    background: "#03DAC5",
    fontSize: "1rem",
    margin: "8px auto",
  };

  return (
    <div style={paddedDivStyle}>
      <HomePageArrow margin={"0"} />
      <ErrorBox message={error} />
      <div style={titleStyle}> {areaInfo.areaName}</div>
      <div style={borderMapStyle}>
        <MapInteractionCSS
          onChange={(value) => {
            setMapProperties(value);
          }}
          value={mapProperties}
          style={mapDivStyle}
        >
          <div>
            <img src={areaInfo.map} alt="Area Map" />
            <SeatMarkers
              areaInfo={areaInfo}
              setSelectedCode={setSelectedCode}
            />
          </div>
        </MapInteractionCSS>
      </div>
      <div
        style={codeBoxStyle}
        onClick={() => {
          navigator.clipboard.writeText(selectedCode);
          alert("Copied to clipboard");
        }}
      >
        <b>Seat Code</b>: {selectedCode}
        {selectedCode === "" ? (
          <div />
        ) : (
          <img style={{ height: "5vw", margin: "auto" }} src={clipBoardIcon} />
        )}
      </div>
      <CodeOrStatusButton seatId={currBooking} />
      <Link to="/report" style={{ textDecoration: "none" }}>
        <button type="submit" style={buttonStyle}>
          REPORT SEAT
        </button>
      </Link>
    </div>
  );
};

export default AreaMapPage;
