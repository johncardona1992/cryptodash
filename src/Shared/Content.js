import React from "react";
import { useAppContext } from "../App/AppProvider";

const Content = (props) => {
  const { state } = useAppContext();
  
  return !state.coinList ? (
    <div>Loading Coins</div>
  ) : (
    <div>{props.children}</div>
  );
};

export default Content;
