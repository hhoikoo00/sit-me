import React from "react";
import { Link } from "react-router-dom";

const HomeAreaTableEntry = ({ areaId, areaName, currentNumber, capacity }) => {
  const tableRowStyle = {
    margin: "3vw 0",
    padding: "5vw",
    fontSize: "3.5vw",
    display: "flex",
    justifyContent: "spaceAround",
    backgroundColor: "white",
    borderRadius: "2.5vw",
  };

  const occupancy = currentNumber / capacity;
  const colour = occupancy < 0.5 ? "green" : occupancy < 1 ? "orange" : "red";
  const capacityIndicatorStyle = {
    backgroundColor: `${colour}`,
    padding: "0.5vw",
    fontWeight: "bolder",
    borderRadius: "2.5vw",
  };

  const areaIdStyle = {
    margin: "auto 0",
    fontWeight: "bolder",
    verticalAlign: "middle",
  };

  const capacityTagStyle = {
    margin: "0 0 0 8vw",
  };

  const floorLabelStyle = {
    fontWeight: "bold",
  };

  // TODO fix linking
  const linkStyle = {
    width: "80vw",
    height: "20vw",
    position: "absolute",
    left: "10vw",
    margin: "-5vw 0 0 0",
    zIndex: "1",
  };

  return (
    <div style={tableRowStyle}>
      <Link style={linkStyle} to={"/area/" + areaId} />
      <div style={areaIdStyle}>{areaId}</div>
      <div style={capacityTagStyle}>
        <div style={floorLabelStyle}> {areaName} </div>
        <div style={{ fontSize: "75%" }}>
          Availability: {capacity - currentNumber} / {capacity}
          <div style={capacityIndicatorStyle} />
        </div>
      </div>
    </div>
  );
};

const HomeAreaTable = ({ areaInfo }) => {
  const tableStyle = {
    backgroundColor: "rgba(0,0,0,0)",
    width: "100%",
    borderRadius: "10px",
    borderCollapse: "collapse",
    marginTop: "5vh",
  };

  return (
    <div style={tableStyle}>
      {areaInfo.map((entry) => (
        <HomeAreaTableEntry
          key={entry.areaId}
          areaId={entry.areaId}
          areaName={entry.areaName}
          currentNumber={entry.currentNumber}
          capacity={entry.capacity}
        />
      ))}
    </div>
  );
};

export default HomeAreaTable;
