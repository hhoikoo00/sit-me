import React from "react";
import { Link } from "react-router-dom";

import returnArrow from "../../assets/icons/backArrow.svg";

const HomePageArrow = ({ margin }) => {
  return (
    <Link to="/">
      <img style={{ width: "5vw", margin }} src={returnArrow} />
    </Link>
  );
};

export default HomePageArrow;
