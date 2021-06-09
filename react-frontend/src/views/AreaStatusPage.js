import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAreaDetail } from "../utils/DataFetcher";

import AreaTable from "../components/AreaTable/AreaTable";
import EnterCodeButton from "../components/EnterCode/EnterCodeButton";
import HomePageArrow from "../components/Home/HomePageArrow";

const AreaStatusPage = () => {
  const areaId = useParams().id;
  const [areaInfo, setAreaInfo] = useState([]);

  const paddedDivStyle = {
    margin: "10vh 10vw",
  };

  const titleStyle = {
    fontSize: "6vw",
  };

  useEffect(() => {
    (async () => {
      const areaData = await getAreaDetail(areaId);
      setAreaInfo(areaData);
    })();
  }, []);

  document.body.style = "background: rgb(245, 245, 245)";

  return (
    <div style={paddedDivStyle}>
      <HomePageArrow margin={"0"} />
      <div style={titleStyle}> Area: {areaId}</div>
      <AreaTable areaInfo={areaInfo} />
      <EnterCodeButton />
    </div>
  );
};

export default AreaStatusPage;
