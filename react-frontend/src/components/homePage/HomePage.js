import React, { useEffect, useState } from "react";
import { getAllAreas } from "../../DataFetcher";
import "../../css/index.css";
import HomeAreaTable from "./HomeAreaTable";

const HomePage = () => {
  const [areaInfo, setAreaInfo] = useState([]);

  const paddedDivStyle = {
    margin: "10vh 10vw",
  };

  const titleStyle = {
    fontSize: "6vw",
  };

  useEffect(() => {
    const fetchAreaData = async () => {
      const areaData = await getAllAreas();
      const newAreaInfo = [];
      
      areaData.forEach((entry) => newAreaInfo.push(entry));
      setAreaInfo(newAreaInfo);
    };
    fetchAreaData();
  }, []);
  document.body.style = "background: rgb(245, 245, 245)";
  return (
    <div style={paddedDivStyle}>
      <div style={titleStyle}>Current Status</div>
      <HomeAreaTable areaInfo={areaInfo} />
    </div>
  );
};
export default HomePage;
