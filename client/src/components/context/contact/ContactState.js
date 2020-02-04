import React, { useReducer } from "react";
import axios from "axios";
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";

import {
  GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CONTACT_ERROR,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  SET_CURRENT
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    error: null,
    loading: true
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const getContacts = async () => {
    try {
      const res = await axios.get("http://165.22.223.149:5000/api/contacts");
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error });
    }
  };

  const addContact = async contact => {
    try {
      const res = await axios.post(
        "http://165.22.223.149:5000/api/contacts",
        contact
      );
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error });
    }
  };

  const deleteContact = async id => {
    try {
      const res = await axios.delete(
        `http://165.22.223.149:5000/api/contacts/${id}`
      );
      dispatch({ type: DELETE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR });
    }
  };
  const updateContact = async contact => {
    try {
      const res = await axios.put(
        `http://165.22.223.149:5000/api/contacts/${contact._id}`,
        contact
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };
  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        error: state.error,
        getContacts,
        clearCurrent,
        updateContact,
        addContact,
        deleteContact,
        clearContacts,
        setCurrent
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
