import React, { useEffect, useState } from "react";
import { getAreaDetail } from "../../DataFetcher";
import AreaTable from "./AreaTable";
import { useParams } from "react-router-dom";

import "../../css/index.css";
import EnterCodeButton from "../enterCodePage/EnterCodeButton";
import HomePageArrow from "../homePage/HomePageArrow";

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
    const fetchAreaData = async () => {
      const areaData = await getAreaDetail(areaId);
      const newAreaInfo = [];

      areaData.forEach((entry) => newAreaInfo.push(entry));
      setAreaInfo(newAreaInfo);
    };
    fetchAreaData();
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
