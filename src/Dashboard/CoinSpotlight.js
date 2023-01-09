import React from "react";
import styled from "styled-components";
import { useAppContext } from "../App/AppProvider";
import CoinImage from "../Shared/CoinImage";
import { Tile } from "../Shared/Tile";

const SpotlightNameStyled = styled.h2`
  text-align: center;
`;

const CoinSpotlight = () => {
  const { state } = useAppContext();
  return (
    state.currentFavorite && (
      <Tile>
        <SpotlightNameStyled>{state.coinList[state.currentFavorite].CoinName}</SpotlightNameStyled>
        <CoinImage spotlight coin={state.coinList[state.currentFavorite]} />
      </Tile>
    )
  );
};

export default CoinSpotlight;
