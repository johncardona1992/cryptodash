import React from "react";
import styled from "styled-components";
import { useAppContext } from "../App/AppProvider";

const ConfirmBottomStyled = styled.div`
  margin: 20px;
  color: green;
  cursor: pointer;
`;

const CenterDivStyled = styled.div`
  display: grid;
  justify-content: center;
`;

const ConfirmBottom = () => {
  const { confirmFavoritesHandler } = useAppContext();
  return (
    <CenterDivStyled>
      <ConfirmBottomStyled onClick={confirmFavoritesHandler}>
        Confirm Favorites
      </ConfirmBottomStyled>
    </CenterDivStyled>
  );
};

export default ConfirmBottom;
