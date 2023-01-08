import React, { Fragment } from "react";
import styled from "styled-components";
import ConfirmBottom from "./ConfirmBottom";
import WelcomeMessage from "./WelcomeMessage";

const WelcomeStyled = styled.div`
  font-size: 2em;
`;

const Settings = () => {
  return (
    <Fragment>
      <WelcomeStyled>
        <WelcomeMessage/>
      </WelcomeStyled>
      <ConfirmBottom/>
    </Fragment>
  );
};

export default Settings;
