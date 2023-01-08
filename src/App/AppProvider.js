import React, { useEffect } from "react";
import { useState, useContext } from "react";

//cryptoCompare API
const cc = require("cryptocompare");

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //create context state
  const [state, setState] = useState({
    page: "dashboard",
    firstVisit: true,
    data: null,
  });

  //fetch data at the end of rendering AppProvider
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        let coinList = await cc.coinList();
        console.log(coinList.Data);
        setState((prevState) => ({
          ...prevState,
          data: coinList.Data,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoins();
  }, []);

  //page handler
  const pageHandler = (name) => {
    return setState((prevState) => ({ ...prevState, page: name }));
  };

  const confirmFavoritesHandler = () => {
    //update context state
    setState((prevState) => ({
      ...prevState,
      page: "dashboard",
      firstVisit: false,
    }));

    return localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        test: "hello",
      })
    );
  };

  //default settings handler
  const savedSettingsHandler = () => {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return setState((prevState) => ({
        ...prevState,
        page: "settings",
        firstVisit: true,
      }));
    }
    return {};
  };

  return (
    <AppContext.Provider
      value={{
        state,
        pageHandler,
        savedSettingsHandler,
        confirmFavoritesHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook to access Context variables.
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
