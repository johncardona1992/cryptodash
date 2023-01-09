import React from "react";
import styled from "styled-components";
import { DeletableTitle } from "../Shared/Tile";

const CoinHeaderGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CoinSymbolStyled = styled.div`
  justify-self: right;
`;

const DeleteIcon = styled.div`
  justify-self: right;
  display: none;
  ${DeletableTitle}:hover & {
    display: block;
    color: red;
  }
`;

const CoinHeaderGrid = (props) => {
  return (
    <CoinHeaderGridStyled>
      <div>{props.name}</div>
      {props.topSection ? (
        <DeleteIcon> X </DeleteIcon>
      ) : (
        <CoinSymbolStyled>{props.symbol}</CoinSymbolStyled>
      )}
    </CoinHeaderGridStyled>
  );
};

export default CoinHeaderGrid;
