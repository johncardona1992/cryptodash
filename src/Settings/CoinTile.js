import React from "react";
import { useAppContext } from "../App/AppProvider";
import CoinImage from "../Shared/CoinImage";
import { SelectableTile } from "../Shared/Tile";
import CoinHeaderGrid from "./CoinHeaderGrid";

const CoinTile = (props) => {
  const { state } = useAppContext();
  let coin = state.coinList[props.coinKey];
  return (
    <SelectableTile>
      <CoinHeaderGrid name={coin.CoinName} symbol={coin.Symbol} />
      <CoinImage coin={coin}/>
    </SelectableTile>
  );
};

export default CoinTile;
