import React from "react";
import styled from "styled-components";
import { useAppContext } from "../App/AppProvider";
import CoinTile from "./CoinTile";

const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`;

const CoinGrid = (props) => {
  const { state } = useAppContext();

  const getLowerSectionCoins = (coinList, filteredCoins) => {
    return (
      (filteredCoins && Object.keys(filteredCoins)) ||
      Object.keys(coinList).slice(0, 100)
    );
  };

  const getCoinsToDisplay = (
    coinList,
    topSection,
    favorites,
    filteredCoins
  ) => {
    return topSection
      ? favorites
      : getLowerSectionCoins(coinList, filteredCoins);
  };

  return (
    <CoinGridStyled>
      {getCoinsToDisplay(
        state.coinList,
        props.topSection,
        state.favorites,
        state.filteredCoins
      ).map((item) => (
        <CoinTile topSection={props.topSection} coinKey={item} />
      ))}
    </CoinGridStyled>
  );
};

export default CoinGrid;
