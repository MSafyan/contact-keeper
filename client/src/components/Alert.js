import React, { useContext } from "react";
import AlertContext from "./context/alerts/alertContext";
const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div className={`alert-${alert.type} btn-block`}>
        {"  "}
        <i className=" fas fa-exclamation "></i>
        {" " + alert.msg}
      </div>
    ))
  );
};

export default Alert;
