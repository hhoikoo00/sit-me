import React from "react";
import BreakButton from "../TakeCancelBreak";

const ButtonScreen = ({
  isMine,
  cancelSeat,
  goHome,
  doTakeBreak,
  doCancelBreak,
  isOnBreak,
  requestSeat,
  report,
}) => {
  const buttonsContainerStyle = {
    margin: "15vw auto",
  };

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

  return (
    <div className="buttonsContainer" style={buttonsContainerStyle}>
      {isMine ? (
        <div>
          <BreakButton
            doTakeBreak={doTakeBreak}
            doCancelBreak={doCancelBreak}
            isOnBreak={isOnBreak}
          />
          <button type="button" style={statusButtonStyle} onClick={cancelSeat}>
            FINISH STUDYING
          </button>
        </div>
      ) : (
        <div>
          <button type="button" style={statusButtonStyle} onClick={requestSeat}>
            REQUEST SEAT
          </button>
          <button type="button" style={statusButtonStyle} onClick={report}>
            REPORT
          </button>
        </div>
      )}

      <button type="button" style={statusButtonStyle} onClick={goHome}>
        HOME
      </button>
    </div>
  );
};

export default ButtonScreen;
