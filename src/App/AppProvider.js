import React, { useEffect } from "react";
import { useState, useContext } from "react";
import _ from "lodash";

//constants
const MAX_FAVORITES = 10;

//cryptoCompare API
const cc = require("cryptocompare");
cc.setApiKey(process.env.REACT_APP_CRYPTOAPI);

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //create context state

  const [state, setState] = useState({
    page: "dashboard",
    favorites: ["BTC", "ETH"],
    firstVisit: true,
    coinList: null,
    filteredCoins: null,
    prices: null,
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
        console.warn(error);
      }
    };

    const fetchPrices = async () => {

      if (state.firstVisit) return;
      let prices = await pricesHttpRequest();
      // We must filter the empty price objects (not in the lecture)
      prices = prices.filter((price) => Object.keys(price).length);
      console.log(prices);
      setState((prevState) => ({
        ...prevState,
        prices,
      }));
    };

    const pricesHttpRequest = async () => {
      let favorites = [...state.favorites];
      let data = [];
      for (let i = 0; i < favorites.length; i++) {
        try {
          let priceData = await cc.priceFull(favorites[i], "USD");
          data.push(priceData);
        } catch (err) {
          console.warn(err);
        }
      }
      return data;
    };

    fetchCoins();
    fetchPrices();
  }, [state.firstVisit, state.favorites]);

  //page handler
  const pageHandler = (name) => {
    return setState((prevState) => ({ ...prevState, page: name }));
  };

  const addCoin = (key) => {
    let favorites = [...state.favorites];
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
    if (favorites.length) {
      setState((prevState) => ({
        ...prevState,
        favorites: favorites.filter((item) => item !== key),
      }));
    }
  };

  const isInFavorites = (key) => _.includes(state.favorites, key);

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
        favorites: state.favorites,
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
    let { favorites } = cryptoDashData;
    return { favorites };
  };

  const filterCoinsHandler = (filteredCoins) => {
    setState((prevState) => ({
      ...prevState,
      filteredCoins,
    }));
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
        isInFavorites,
        filterCoinsHandler,
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
