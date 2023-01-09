import React from "react";
import { useAppContext } from "../App/AppProvider";
import CoinImage from "../Shared/CoinImage";
import { DeletableTitle, DisabledTitle, SelectableTile } from "../Shared/Tile";
import { CoinHeaderGrid } from "./CoinHeaderGrid";

const clickCoinHandler = (topSection, coinKey, addCoin, removeCoin) => {
  return topSection
    ? () => {
        removeCoin(coinKey);
      }
    : () => {
        addCoin(coinKey);
      };
};

const CoinTile = (props) => {
  const { state, addCoin, removeCoin, isInFavorites } = useAppContext();
  let coin = state.coinList[props.coinKey];
  let TileClass = SelectableTile;
  if (props.topSection) {
    TileClass = DeletableTitle;
  } else if (isInFavorites(props.coinKey)) {
    TileClass = DisabledTitle;
  }
  return (
    <TileClass
      onClick={clickCoinHandler(
        props.topSection,
        props.coinKey,
        addCoin,
        removeCoin
      )}
    >
      <CoinHeaderGrid
        topSection={props.topSection}
        name={coin.CoinName}
        symbol={coin.Symbol}
      />
      <CoinImage coin={coin} />
    </TileClass>
  );
};

export default CoinTile;
