import React, { useEffect } from "react";
import { useState, useContext } from "react";
import _ from "lodash";
import moment from "moment";

//constants
const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

//cryptoCompare API
const cc = require("cryptocompare");
cc.setApiKey(process.env.REACT_APP_CRYPTOAPI);

const fetchHistorical = async (
  firstVisit,
  currentFavorite,
  setState,
  timeInterval
) => {
  console.log("running fetchHistorical");
  if (firstVisit) return;
  let results = await historicalHttpRequest(currentFavorite, timeInterval);
  let historical = [
    {
      name: currentFavorite,
      data: results.map((ticker, index) => [
        moment()
          .subtract({ [timeInterval]: TIME_UNITS - index })
          .valueOf(),
        ticker.USD,
      ]),
    },
  ];

  setState((prevState) => ({
    ...prevState,
    historical,
  }));
};

const historicalHttpRequest = async (currentFavorite, timeInterval) => {
  let promises = [];
  for (let units = TIME_UNITS; units > 0; units--) {
    try {
      promises.push(
        cc.priceHistorical(
          currentFavorite,
          ["USD"],
          moment()
            .subtract({ [timeInterval]: units })
            .toDate()
        )
      );
    } catch (err) {
      console.warn(err);
    }
  }
  return Promise.all(promises);
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //create context state

  const [state, setState] = useState({
    page: "dashboard",
    favorites: ["BTC", "ETH"],
    firstVisit: false,
    coinList: null,
    filteredCoins: null,
    prices: null,
    currentFavorite: null,
    historical: null,
    timeInterval: "months",
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
      } catch (error) {
        console.warn(error);
      }
    };

    const fetchPrices = async () => {
      if (state.firstVisit) return;
      let prices = await pricesHttpRequest();
      // We must filter the empty price objects (not in the lecture)
      prices = prices.filter((price) => Object.keys(price).length);
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
    fetchHistorical(
      state.firstVisit,
      state.currentFavorite,
      setState,
      state.timeInterval
    );
  }, [
    state.firstVisit,
    state.favorites,
    state.currentFavorite,
    state.timeInterval,
  ]);

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
    let currentFavorite = state.favorites[0];

    //update context state
    setState((prevState) => ({
      ...prevState,
      page: "dashboard",
      firstVisit: false,
      currentFavorite,
      prices: null,
      historical: null,
    }));

    return localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        favorites: state.favorites,
        currentFavorite,
      })
    );
  };

  //set current Favorite
  const currentFavoriteHandler = (sym) => {
    setState((prevState) => ({
      ...prevState,
      currentFavorite: sym,
      historical: null,
    }));
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("cryptoDash")),
        currentFavorite: sym,
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
    let { favorites, currentFavorite } = cryptoDashData;
    return { favorites, currentFavorite };
  };

  const filterCoinsHandler = (filteredCoins) => {
    setState((prevState) => ({
      ...prevState,
      filteredCoins,
    }));
  };

  const changeChartSelect = (value) => {
    setState((prevState) => ({
      ...prevState,
      timeInterval: value,
      historical: null,
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
        currentFavoriteHandler,
        changeChartSelect,
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
