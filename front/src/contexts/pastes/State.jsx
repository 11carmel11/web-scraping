import React, { useReducer } from "react";
import pastesReducer from "../../reducers/pastes";
import PastesContext from "./context";

export default function PastesState({ children }) {
  const [pastes, dispatch] = useReducer(pastesReducer, []);

  return (
    <PastesContext.Provider value={{ pastes, dispatch }}>
      {children}
    </PastesContext.Provider>
  );
}
