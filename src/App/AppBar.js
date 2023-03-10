import React from "react";
import styled, { css } from "styled-components";
import { useAppContext } from "./AppProvider";

const Logo = styled.div`
  font-size: 1.5em;
`;

const Bar = styled.div`
  display: grid;
  margin-bottom: 40px;
  grid-template-columns: 180px auto 150px 130px;
`;

const ControlButtonElem = styled.div`
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      text-shadow: 0px 0px 30px #03ff03;
    `};
    ${props => props.hidden && css`
    display: none;
    `}
`;

const ControlButton = ({ name }) => {
  const toProperCase = (lower) => {
    return lower.charAt(0).toUpperCase() + lower.substr(1);
  };

  const { state, pageHandler } = useAppContext();

  return (
    <ControlButtonElem
      active={state.page === name}
      onClick={() => pageHandler(name)}
      hidden={state.firstVisit && state.page === 'dashboard'}
    >
      {toProperCase(name)}
    </ControlButtonElem>
  );
};

const AppBar = () => {
  return (
    <Bar>
      <Logo>CryptoDash</Logo>
      <div />
      <ControlButton active name="dashboard" />
      <ControlButton name="settings" />
    </Bar>
  );
};

export default AppBar;
