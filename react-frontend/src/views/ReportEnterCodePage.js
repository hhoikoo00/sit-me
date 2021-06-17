import React, { useState } from "react";
import { useHistory } from "react-router";
import { reportSeat } from "../utils/DataFetcher";

import HomePageArrow from "../components/Home/HomePageArrow";
import EnterCodeForm from "../components/EnterCode/EnterCodeForm";

const ReportEnterCodePage = () => {
  const [code, setCode] = useState("");
  const history = useHistory();

  const enterCodePageStyle = {
    width: "100vw",
    position: "absolute",
    top: "30vh",
    textAlign: "center",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await reportSeat(code);
    history.push("/");
  };

  return (
    <div className="enterCodePage">
      <HomePageArrow margin="10%" />
      <div className="EnterCodeSection" style={enterCodePageStyle}>
        <EnterCodeForm
          handleSubmit={handleSubmit}
          code={code}
          setCode={setCode}
          buttonDesc="SUBMIT REPORT"
        />
      </div>
    </div>
  );
};

export default ReportEnterCodePage;
