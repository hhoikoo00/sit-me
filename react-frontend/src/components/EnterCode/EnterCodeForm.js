import React from "react";

const EnterCodeForm = ({ handleSubmit, code, setCode }) => {
  const submitButtonStyle = {
    display: "block",
    margin: "40px auto",
    textAlign: "center",
    border: "2px solid #979797",
    padding: "20px 15px",
    width: "200px",
    outline: "none",
    color: "white",
    borderRadius: "1000px",
    borderColor: "#03DAC5",
    background: "#03DAC5",
    fontSize: "1.2rem",
  };

  const enterCodeField = {
    border: "0",
    background: "white",
    display: "block",
    margin: "20px auto",
    textAlign: "left",
    borderRadius: "14px",
    padding: "23px 10px",
    width: "200px",
    outline: "none",
    color: "black",
  };

  return (
    <form action="seatCodeSubmission" onSubmit={handleSubmit}>
      <input
        type="text"
        id="enterCode"
        className="enterCode"
        placeholder="Enter Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={enterCodeField}
      />
      <button type="submit" value="SUBMIT" style={submitButtonStyle}>
          SUBMIT
      </button>
    </form>
  );
};

export default EnterCodeForm;
