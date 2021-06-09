import React from "react";

const AreaTableEntry = ({ seatId, isBooked }) => {
  const tableRowStyle = {
    padding: "5vw",
    fontSize: "4vw",
    display: "flex",
    justifyContent: "spaceAround",
  };

  const capacityIndicatorStyle = {
    backgroundColor: isBooked ? "red" : "green",
    padding: "5vw",
    fontWeight: "bolder",
    borderRadius: "100%",
  };

  const capacityTagStyle = {
    margin: "0 0 0 8vw",
  };

  const floorLabelStyle = {
    fontWeight: "bold",
  };

  return (
    <tr>
      <td style={tableRowStyle}>
        <div style={capacityIndicatorStyle}></div>
        <div style={capacityTagStyle}>
          <div style={floorLabelStyle}>Seat</div>
          <div style={{ fontSize: "75%" }}>
            <b>Code: </b><i>{seatId}</i>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default AreaTableEntry;
