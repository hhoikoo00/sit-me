import React, { useEffect, useState } from "react";
import { getAreaDetail } from "../../DataFetcher";
import AreaTable from "./AreaTable";
import { useParams, Link } from "react-router-dom";

import "../../css/index.css";
import returnArrow from "../../assets/icons/backArrow.png"

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
      <Link to="/"><img style={{ width: "5vw" }}src={returnArrow}/></Link>
      <div style={titleStyle}> Area: {areaId}</div>
      <AreaTable areaInfo={areaInfo} />
    </div>
  );
};
export default AreaStatusPage;
