import React from "react";
import styled from "styled-components";
import Page from "../Shared/Page";
import CoinGrid from "./CoinGrid";
import ConfirmBottom from "./ConfirmBottom";
import Search from "./Search";
import WelcomeMessage from "./WelcomeMessage";

const WelcomeStyled = styled.div`
  font-size: 2em;
`;

const Settings = () => {
  return (
    <Page name="settings">
      <WelcomeStyled>
        <WelcomeMessage />
      </WelcomeStyled>
      <CoinGrid topSection/>
      <ConfirmBottom />
      <Search/>
      <CoinGrid />
    </Page>
  );
};

export default Settings;
