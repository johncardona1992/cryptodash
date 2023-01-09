import React from "react";
import styled from "styled-components";
import { useAppContext } from "../App/AppProvider";
import CoinTile from "./CoinTile";

const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 14px;
  margin-top: 40px;
`;

const CoinGrid = () => {
  const { state } = useAppContext();

  const getCoinsToDisplay = (coins) => {
    return Object.keys(coins).slice(0, 100);
  };

  return (
    <CoinGridStyled>
      {getCoinsToDisplay(state.coinList).map((item) => (
        <CoinTile coinKey={item} />
      ))}
    </CoinGridStyled>
  );
};

export default CoinGrid;
