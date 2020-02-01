import React, { useContext, useEffect, Fragment } from "react";
import ContactContext from "../context/contact/contactContext";
import ContactItem from "./ContactItem";

import Spinner from "../Spinner";

const Contact = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    if (contacts !== null && contacts.length <= 0 && loading === false) {
      return <h4>Please enter contacts</h4>;
    }
  }, [loading]);
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <Fragment>
          {contacts.map(data => {
            return <ContactItem key={data._id} contact={data} />;
          })}
        </Fragment>
      ) : null}
      {contacts === null && loading ? <Spinner /> : null}
    </Fragment>
  );
};

export default Contact;
