import React, { useContext } from "react";
import ContactContext from "../context/contact/contactContext";

const ContactItem = ({ contact }) => {
  const { _id, name, email, phone, type } = contact;
  const contactContext = useContext(ContactContext);
  const {
    deleteContact,
    setCurrent,
    clearCurrent,
    getContacts
  } = contactContext;

  const onDelete = () => {
    deleteContact(_id);
    // console.log(_id);
    clearCurrent();
    getContacts();
  };

  const onSetCurrent = () => {
    setCurrent(contact);
  };
  return (
    <div className="badge card bg-light">
      <h3 className="text-primary text-left">
        {name}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>{" "}
      </h3>

      <ul className="text-left ">
        {email && (
          <li className="fas fa-envelope-open  btn-block my-1">
            {" " + email}
          </li>
        )}
        {phone && <li className="fas fa-phone btn-block">{" " + phone}</li>}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={onSetCurrent}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
