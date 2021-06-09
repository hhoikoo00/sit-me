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
          <div>
            #{seatId}
          </div>
        </div>
      </td>
    </tr>
  );
};

const Entries = ({ areaInfo }) =>
  areaInfo.map((entry) => (
    <AreaTableEntry
      key={entry.seatId}
      seatId={entry.seatId}
      isBooked={entry.isBooked}
    />
  ));

const AreaTable = ({ areaInfo }) => {
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
        <Entries areaInfo={areaInfo} />
      </tbody>
    </table>
  );
};

export default AreaTable;
