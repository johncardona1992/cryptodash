import React, { useEffect } from "react";
import { useState, useContext } from "react";

//constants
const MAX_FAVORITES = 10;

//cryptoCompare API
const cc = require("cryptocompare");
cc.setApiKey(process.env.REACT_APP_CRYPTOAPI);

const AppContext = React.createContext();

const AppProvider = (props) => {
  //create context state
  const [state, setState] = useState({
    page: "dashboard",
    favorites: ["BTC", "ETH"],
    firstVisit: true,
    coinList: null,
  });

  //fetch data at the end of rendering AppProvider
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        let data = await cc.coinList();
        setState((prevState) => ({
          ...prevState,
          coinList: data.Data,
        }));
        console.log(data.Data);
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

  const addCoin = (key) => {
    let favorites = [...state.favorites];
    console.log('adding!');
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      setState((prevState) => ({
        ...prevState,
        favorites,
      }));
    }
  };
  
  const removeCoin = (key) => {
    let favorites = [...state.favorites];
    console.log('removing!');
    if (favorites.length) {
      setState((prevState) => ({
        ...prevState,
        favorites: favorites.filter((item) => item !== key),
      }));
    }
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
        addCoin,
        removeCoin,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

// custom hook to access Context variables.
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
