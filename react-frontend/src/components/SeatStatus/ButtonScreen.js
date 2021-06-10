import React from "react";

const ButtonScreen = ({ isMine, cancelSeat, goHome }) => {
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
    fontSize: "1.2rem",
    margin: "8px auto",
  };

  return (
    <div className="buttonsContainer" style={buttonsContainerStyle}>
      {isMine ? (
        <button type="button" style={statusButtonStyle} onClick={cancelSeat}>
          FINISH STUDYING
        </button>
      ) : (
        <div />
      )}

      <button type="button" style={statusButtonStyle} onClick={goHome}>
        HOME
      </button>
    </div>
  );
};

export default ButtonScreen;
