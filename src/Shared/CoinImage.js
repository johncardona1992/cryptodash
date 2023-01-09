import { coinList } from "cryptocompare";
import React from "react";
import styled, { css } from "styled-components";

const CoinImageStyled = styled.img`
  height: 50px;
  ${(props) =>
    props.spotlight &&
    css`
      height: 200px;
      margin: auto;
      display: block;
    `}
`;

const CoinImage = (props) => {
  return (
    <CoinImageStyled
      spotlight={props.spotlight}
      alt={coinList.CoinSymbol}
      src={`https://cryptocompare.com/${props.coin.ImageUrl}`}
    />
  );
};

export default CoinImage;
