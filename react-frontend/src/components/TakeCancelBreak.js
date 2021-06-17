import React from "react";

const BreakButton = ({ doTakeBreak, doCancelBreak, isOnBreak }) => {
  const statusButtonStyle = {
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
  return isOnBreak ? (
    <button type="button" style={statusButtonStyle} onClick={doCancelBreak}>
      END BREAK
    </button>
  ) : (
    <button type="button" style={statusButtonStyle} onClick={doTakeBreak}>
      15 MINUTE BREAK
    </button>
  );
};

export default BreakButton;
