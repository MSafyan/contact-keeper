import React, { useReducer } from "react";
import uuid from "uuid";
import AlertReducer from "../alerts/alertReducer";
import AlertContext from "../alerts/alertContext";

import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = props => {
  const initialState = [];
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (type, msg, time = 5000) => {
    const id = uuid.v4();
    dispatch({ type: SET_ALERT, payload: { id, type, msg } });
    console.log("timer start");

    setTimeout(() => {
      dispatch({
        REMOVE_ALERT,
        payload: id
      });
      console.log("timer end");
    }, time);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
