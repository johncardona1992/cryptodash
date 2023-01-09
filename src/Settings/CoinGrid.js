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

const CoinGrid = (props) => {
  const { state } = useAppContext();

  const getCoinsToDisplay = (coins, topSection) => {
    return Object.keys(coins).slice(0,topSection ? 10 : 100);
  };

  return (
    <CoinGridStyled>
      {getCoinsToDisplay(state.coinList, props.topSection).map((item) => (
        <CoinTile topSection={props.topSection} coinKey={item} />
      ))}
    </CoinGridStyled>
  );
};

export default CoinGrid;
