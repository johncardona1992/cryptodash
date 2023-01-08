import React from "react";
import { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    page: "dashboard",
  });

  const handlePage = (name) => {
    setState((prevState) => ({ ...prevState, page: name }));
  };

  return (
    <AppContext.Provider value={{ state, handlePage }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hook to access Context variables.
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
