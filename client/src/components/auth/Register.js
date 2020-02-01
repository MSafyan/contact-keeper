import React, { useState, useContext, useEffect } from "react";

import AlertContext from "../context/alerts/alertContext";
import AuthContext from "../context/auth/authContext";

import Alert from "../Alert";

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { error, clearError, register, isAuthenticated } = authContext;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "User already exists") {
      setAlert("danger", "User already exists");
      clearError();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    console.log("register submit");
    if (name === "" || email === "" || password === "" || password2 === "") {
      setAlert("danger", "please fillout all fields");
    } else if (password !== password2) {
      setAlert("danger", "Passwords are not matching");
    } else {
      register({ name, password, email });
      console.log("register submit2.0");
    }
  };

  const { name, email, password, password2 } = user;
  return (
    <div className="form-container">
      <Alert />
      <form onSubmit={onSubmit}>
        <h2>
          Account <span className="text-primary"> Register</span>
        </h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" value={name} name="name" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" value={email} name="email" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-block btn-primary"
        />
      </form>
    </div>
  );
};

export default Register;
