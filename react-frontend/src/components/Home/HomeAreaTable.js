import React from "react";
import { Link } from "react-router-dom";

const HomeAreaTableEntry = ({ areaId, areaName, currentNumber, capacity }) => {
  const tableRowStyle = {
    padding: "5vw",
    fontSize: "3vw",
    display: "flex",
    justifyContent: "spaceAround",
  };

  const occupancy = currentNumber / capacity;
  const colour = occupancy < 0.5 ? "green" : occupancy < 1 ? "orange" : "red";
  const capacityIndicatorStyle = {
    backgroundColor: `${colour}`,
    padding: "4vw",
    fontWeight: "bolder",
    borderRadius: "2.5vw",
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
    height: "10vh",
    position: "absolute",
    left: "10vw",
    zIndex: "1",
  };

  return (
    <tr>
      <td style={tableRowStyle}>
        <Link style={linkStyle} to={"/area/" + areaId} />
        <div style={capacityIndicatorStyle}>{areaId}</div>
        <div style={capacityTagStyle}>
          <div style={floorLabelStyle}> {areaName} </div>
          <div style={{ fontSize: "75%" }}>
            Availability: {capacity - currentNumber} / {capacity}{" "}
          </div>
        </div>
      </td>
    </tr>
  );
};

const HomeAreaTable = ({ areaInfo }) => {
  const tableStyle = {
    backgroundColor: "white",
    width: "100%",
    borderRadius: "10px",
    borderCollapse: "collapse",
    marginTop: "5vh",
  };

  return (
    <table style={tableStyle}>
      <tbody>
        {areaInfo.map((entry) => (
          <HomeAreaTableEntry
            key={entry.areaId}
            areaId={entry.areaId}
            areaName={entry.areaName}
            currentNumber={entry.currentNumber}
            capacity={entry.capacity}
          />
        ))}
      </tbody>
    </table>
  );
};

export default HomeAreaTable;
