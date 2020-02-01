import React, { useState, useEffect, useContext } from "react";
import AlertContext from "../context/alerts/alertContext";
import AuthContext from "../context/auth/authContext";
import Alert from "../Alert";

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { isAuthenticated, error, clearError, loginUser } = authContext;
  const { setAlert } = alertContext;

  const [user, setUser] = useState({ email: "", password: "" });

  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "Invalid Credentials") {
      setAlert("danger", "Invalid Credentials");
      clearError();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    console.log("login submit");
    if (email === "" || password === "") {
      setAlert("danger", "please fillout all fields");
    } else {
      loginUser({ password, email });

      console.log("login submit2.0");
    }
  };

  return (
    <div className="form-container">
      <Alert />
      <form onSubmit={onSubmit}>
        <h2>
          Account <span className="text-primary"> Login</span>
        </h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
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
        <input
          type="submit"
          value="Login"
          className="btn btn-block btn-primary"
        />
      </form>
    </div>
  );
};

export default Login;
