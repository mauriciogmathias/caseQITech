import React, { useReducer, createContext } from "react";

export const Context = createContext();

const initialState = {
  questions: null,
  answers: null,
  loading: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        questions: action.payload.questions,
        answers: action.payload.answers,
        loading: false,
      };
    case "CLEAN_QUESTIONS":
      return {
        questions: null,
        loading: false,
      };
    case "SET_LOADING":
      return {
        loading: true,
      };
    default:
      throw new Error();
  }
};

export const ContactContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};
