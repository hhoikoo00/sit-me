import React from "react";

const ErrorBox = ({ message }) => {
  const errorBoxStyle = {
    backgroundColor: "rgba(200, 0, 0, 0.4)",
    width: "100%",
    height: "3vw",
    margin: "auto",
    padding: "1vh",
    color: "black",
    fontWeight: "bold",
    border: "2px solid rgb(200, 0, 0)",
    fontSize: "2vw",
    overflow: "hidden",
    whiteSpace: "nowrap",
    overflowX: "visible",
  };
  if (message === "") {
    return <div />;
  } else {
    return <div style={errorBoxStyle}>{message}</div>;
  }
};

export default ErrorBox;
