import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/auth/authContext";
import ContactContext from "./context/contact/contactContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { user, isAuthenticated, logout } = authContext;
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const noUserLinks = () => (
    <Fragment>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </Fragment>
  );

  const userLinks = () => (
    <Fragment>
      <li>Hello{user !== null ? <h3> {user.name}</h3> : null}</li>

      <li>
        <a onClick={onLogout} href="#!">
          {" "}
          <span className="sm-hide">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </span>{" "}
        </a>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} />
        {title}
      </h1>
      <ul>{isAuthenticated ? userLinks() : noUserLinks()}</ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: " Contact Keeper",
  icon: "fas fa-id-card-alt"
};
// Navbar.propTypes = {
//   title: PropTypes.string.isRequired,
//   icon: PropTypes.string
// };

export default Navbar;
