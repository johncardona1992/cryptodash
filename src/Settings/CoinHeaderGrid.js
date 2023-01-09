import React from "react";
import styled from "styled-components";

const CoinHeaderGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CoinSymbolStyled = styled.div`
  justify-self: right;
`;

const CoinHeaderGrid = (props) => {
  return (
    <CoinHeaderGridStyled>
      <div>{props.name}</div>
      <CoinSymbolStyled>{props.symbol}</CoinSymbolStyled>
    </CoinHeaderGridStyled>
  );
};

export default CoinHeaderGrid;
