import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CLEAR_CONTACTS,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  CONTACT_ERROR,
  FILTER_CONTACT,
  SET_CURRENT
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        ),
        loading: false
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          action.payload._id !== contact._id ? contact : action.payload
        )
      };
    case CLEAR_CONTACTS:
      return {
        contacts: null,
        error: null,
        current: null
      };
    case CONTACT_ERROR:
      return {
        error: action.payload,
        ...state
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };

    default:
      return state;
  }
};
