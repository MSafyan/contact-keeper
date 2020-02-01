import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { current, updateContact, clearCurrent, getContacts } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      contactContext.addContact(contact);
    } else {
      updateContact(contact);
    }
    getContacts();

    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal"
    });
  };

  const { name, email, phone, type } = contact;
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>{current === null ? "Add Contact" : "Edit Contact"}</h2>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={onChange}
          placeholder="Phone"
        />
        <h5>Contact Type</h5>
        <input
          type="radio"
          name="type"
          value="personal"
          onChange={onChange}
          checked={type === "personal"}
          id=""
        />
        Personal{"  "}
        <input
          type="radio"
          name="type"
          value="perfessional"
          onChange={onChange}
          checked={type === "perfessional"}
          id=""
        />
        Perfessional
        <input
          type="submit"
          value={current === null ? "Add Contact" : "Edit Contact"}
          className="btn btn-primary btn-block"
        />
        {current && (
          <button
            className="btn btn-block btn-light"
            value="Clear"
            onClick={() => {
              clearCurrent();
            }}
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
