import React from "react";
import AreaTableEntry from "./AreaTableEntry";

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
        {
          areaInfo.seats.map((entry) =>
            <AreaTableEntry
              key={entry.seatId}
              seatId={entry.seatId}
              isBooked={entry.isBooked}
            />)
        }
      </tbody>
    </table>
  );
};

export default AreaTable;
