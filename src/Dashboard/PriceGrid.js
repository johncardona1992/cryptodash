import React from "react";
import styled from "styled-components";
import { useAppContext } from "../App/AppProvider";
import PriceTile from "./PriceTile";

const PriceGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`;

const PriceGrid = () => {
  const { state } = useAppContext();

  return (
    <PriceGridStyled>
      {state.prices && state.prices.map((price, index) => (
        <PriceTile index={index} price={price} />
      ))}
    </PriceGridStyled>
  );
};

export default PriceGrid;
