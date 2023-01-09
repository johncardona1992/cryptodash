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

  const getCoinsToDisplay = (coins, topSection, favorites) => {
    return topSection ? favorites : Object.keys(coins).slice(0,100);
  };

  return (
    <CoinGridStyled>
      {getCoinsToDisplay(state.coinList, props.topSection, state.favorites).map((item) => (
        <CoinTile topSection={props.topSection} coinKey={item} />
      ))}
    </CoinGridStyled>
  );
};

export default CoinGrid;
