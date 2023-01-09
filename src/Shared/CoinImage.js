import { coinList } from "cryptocompare";
import React from "react";

const CoinImage = (props) => {
  return (
    <img
      alt={coinList.CoinSymbol}
      style={props.style || { height: "50px" }}
      src={`https://cryptocompare.com/${props.coin.ImageUrl}`}
    />
  );
};

export default CoinImage;
