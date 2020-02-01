import React, { useEffect, useContext } from "react";
import Contact from "../contacts/Contact";
import ContactForm from "../contacts/ContactForm";
// import SetAuthToken from "../SetAuthToken";
import AuthContext from "../context/auth/authContext";
import ContactContext from "../context/contact/contactContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { loadUser } = authContext;
  const { getContacts } = contactContext;

  useEffect(() => {
    loadUser();
    getContacts();
    //eslint-disable-next-line
  }, []);
  return (
    <div className={"grid-2"}>
      <div>
        <ContactForm />
      </div>
      <div>
        <Contact />
      </div>
    </div>
  );
};

export default Home;
