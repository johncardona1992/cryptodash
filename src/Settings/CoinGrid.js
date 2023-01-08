import React from "react";
import styled from "styled-components";
import { useAppContext } from "../App/AppProvider";

const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const CoinGrid = () => {
  const { state } = useAppContext();
  return (
    <CoinGridStyled>
      {Object.keys(state.coinList).map((coinKey) => (
        <div>{coinKey}</div>
      ))}
    </CoinGridStyled>
  );
};

export default CoinGrid;
