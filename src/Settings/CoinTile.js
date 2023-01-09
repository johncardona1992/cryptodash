import React from "react";
import { useAppContext } from "../App/AppProvider";
import CoinImage from "../Shared/CoinImage";
import { DeletableTitle, SelectableTile } from "../Shared/Tile";
import CoinHeaderGrid from "./CoinHeaderGrid";

const CoinTile = (props) => {
  const { state } = useAppContext();
  let coin = state.coinList[props.coinKey];
  let TileClass = SelectableTile;
  if (props.topSection) {
    TileClass = DeletableTitle;
  }
  return (
    <TileClass>
      <CoinHeaderGrid topSection={props.topSection} name={coin.CoinName} symbol={coin.Symbol} />
      <CoinImage coin={coin} />
    </TileClass>
  );
};

export default CoinTile;
