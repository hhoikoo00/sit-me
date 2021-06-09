import React from "react";

const DropDownMenu = ({ val, setVal, vals, label }) => {
  const selectStyle = {
    display: "inlineBlock",
    flex: "1",
    padding: "0.5vw 0.5vw",
  };

  const labelStyle = {
    position: "absolute",
    transform: "translate(0px, -5.8vw)",
    fontSize: "1.1rem",
  };

  const selectBoxStyle = {
    width: "25vw",
    height: "8vw",
    borderRadius: "10px",
    background: "white",
    border: "0",
  };

  const Options = () =>
    vals.map((currVal) => (
      <option key={currVal} value={currVal}>
        {currVal}
      </option>
    ));

  return (
    <div className="selectHours" style={selectStyle}>
      <label style={labelStyle}>{label}</label>
      <select
        name="hours"
        id="hours"
        style={selectBoxStyle}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      >
        <Options />
      </select>
    </div>
  );
};

export default DropDownMenu;
