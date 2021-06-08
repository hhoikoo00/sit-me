import React from "react";
const HomeAreaTableEntry = ({ areaId, areaName, currentNumber, capacity }) => {
  const tableRowStyle = {
    padding: "5vw",
    fontSize: "4vw",
    display: "flex",
    justifyContent: "spaceAround",
  };

  const red = (256 * currentNumber) / capacity;
  const green = 256 - red;
  const capacityIndicatorStyle = {
    backgroundColor: `rgb(${red}, ${green}, 0)`,
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

  return (
    <tr>
      <td style={tableRowStyle}>
        <div style={capacityIndicatorStyle}>{areaId}</div>
        <div style={capacityTagStyle}>
          <div style={floorLabelStyle}> {areaName} </div>
          <div>
            {" "}
            {currentNumber} / {capacity}{" "}
          </div>
        </div>
      </td>
    </tr>
  );
};

const Entries = ({ areaInfo }) =>
  areaInfo.map((entry) => (
    <HomeAreaTableEntry
      key={entry.areaId}
      areaId={entry.areaId}
      areaName={entry.areaName}
      currentNumber={entry.currentNumber}
      capacity={entry.capacity}
    />
  ));

const HomeAreaTable = ({ areaInfo }) => {
  console.log(areaInfo);

  const tableStyle = {
    backgroundColor: "white",
    width: "100%",
    borderRadius: "10px",
    borderCollapse: "collapse",
    marginTop: "5vh",
  };

  return (
    <table style={tableStyle}>
      <Entries areaInfo={areaInfo} />
    </table>
  );
};

export default HomeAreaTable;
