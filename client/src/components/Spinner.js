import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <div>
      <img src={spinner} alt="loading..." style={{ width: "200px" }}></img>
    </div>
  );
};

export default Spinner;
