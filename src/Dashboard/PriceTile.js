import React from "react";
import styled, { css } from "styled-components";
import { fontSize3, fontSizeBig, greenBoxShadow } from "../Shared/Styles";
import { SelectableTile } from "../Shared/Tile";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid";
import { useAppContext } from "../App/AppProvider";

const JustifyRight = styled.div`
  justify-self: right;
`;

const JustifyLeft = styled.div`
  justify-self: left;
`;

const TickerPrice = styled.div`
  ${fontSizeBig};
`;

const ChangePct = styled.div`
  color: green;
  ${(props) =>
    props.red &&
    css`
      color: red;
    `}
`;

const numberFormat = (number) => {
  return +(number + "").slice(0, 7);
};

const PriceTileStyled = styled(SelectableTile)`
  ${(props) =>
    props.compact &&
    css`
      display: grid;
      ${fontSize3};
      grid-gap: 5px;
      grid-template-columns: repeat(3, 1fr);
      justify-items: right;
    `}
  ${(props) =>
    props.currentFavorite &&
    css`
      ${greenBoxShadow};
      pointer-events: none;
    `}
`;

const ChangePercent = (props) => {
  return (
    <JustifyRight>
      <ChangePct red={props.data.CHANGEPCT24HOUR < 0}>
        {numberFormat(props.data.CHANGEPCT24HOUR)}
      </ChangePct>
    </JustifyRight>
  );
};

const PriceTileWrapper = (props) => {
  return (
    <PriceTileStyled
      onClick={props.currentFavoriteHandler}
      currentFavorite={props.currentFavorite}
    >
      <CoinHeaderGridStyled>
        <div>{props.sym}</div>
        <ChangePercent data={props.data} />
      </CoinHeaderGridStyled>
      <TickerPrice>${numberFormat(props.data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  );
};

const PriceTileCompact = (props) => {
  return (
    <PriceTileStyled
      onClick={props.currentFavoriteHandler}
      compact
      currentFavorite={props.currentFavorite}
    >
      <JustifyLeft>{props.sym}</JustifyLeft>
      <ChangePercent data={props.data} />
      <div>${numberFormat(props.data.PRICE)}</div>
    </PriceTileStyled>
  );
};

const PriceTile = (props) => {
  let sym = Object.keys(props.price)[0];
  let data = props.price[sym]["USD"];
  let TitleClass = props.index < 5 ? PriceTileWrapper : PriceTileCompact;
  const { state, currentFavoriteHandler } = useAppContext();
  return (
    <TitleClass
      sym={sym}
      data={data}
      currentFavorite={state.currentFavorite === sym}
      currentFavoriteHandler={()=>currentFavoriteHandler(sym)}
    ></TitleClass>
  );
};

export default PriceTile;
