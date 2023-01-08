import React from "react";
import { useAppContext } from "../App/AppProvider";

const WelcomeMessage = () => {
  const { state } = useAppContext();
  return state.firstVisit ? (
    <div>
      Welcome to CryptoDash, please select your favorite coins to begin.{' '}
    </div>
  ) : null;
};

export default WelcomeMessage;
