import React from "react";
import AreaTableEntry from "./AreaTableEntry";

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
