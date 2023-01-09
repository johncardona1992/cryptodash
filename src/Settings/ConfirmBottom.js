import React from "react";
import styled from "styled-components";
import { useAppContext } from "../App/AppProvider";
import { fontSize1, greenBoxShadow, color3 } from "../Shared/Styles";

const ConfirmBottomStyled = styled.div`
  margin: 20px;
  color: ${color3};
  ${fontSize1}
  padding: 5px;
  cursor: pointer;
  &:hover {
    ${greenBoxShadow}
  }
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
