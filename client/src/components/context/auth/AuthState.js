import React, { useReducer } from "react";
import axios from "axios";

import AuthReducer from "../auth/authReducer";
import AuthContext from "../auth/authContext";
import SetAuthToken from "../../SetAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const register = async formdata => {
    const config = {
      headers: {
        "Content-Type": "applicaton/json"
      }
    };

    axios
      .post("http://139.59.85.140:5000/api/users", formdata)
      .then(res => {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        loadUser();
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: REGISTER_FAIL, payload: error });
        // Promise.reject(error);
      });

    // try {
    //   const res = await axios.post("http://localhost:5000/api/users", formdata);

    //   dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    //   console.log(res.data)
    // } catch (error) {
    //   console.error(error);
    //   dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    // }
  };

  const loadUser = async () => {
    if (localStorage.token) {
      SetAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("http://139.59.85.140:5000/api/auth");
      // console.log(res);
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const loginUser = async formdata => {
    const config = {
      headers: {
        "Content-Type": "applicaton/json"
      }
    };
    const res = await axios
      .post("'http://139.59.85.140:5000/api/auth", formdata)
      .then(res => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        loadUser();
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: LOGIN_FAIL, payload: error.response });
        // Promise.reject(error);
      });
  };

  const clearError = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        logout,
        register,
        clearError,
        loadUser,
        loginUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
