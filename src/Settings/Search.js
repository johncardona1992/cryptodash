import React from "react";
import styled from "styled-components";
import { useAppContext } from "../App/AppProvider";
import { backgroundColor2, fontSize2 } from "../Shared/Styles";
import _ from "lodash";
import fuzzy from "fuzzy";

const SearchGridStyled = styled.div`
  display: grid;
  grid-template-columns: 230px 1fr;
`;

const SearchInput = styled.input`
  ${backgroundColor2};
  ${fontSize2};
  border: 1px solid;
  height: 25px;
  color: #1163c9;
  place-self: center left;
`;

const Search = () => {
  const { state, filterCoinsHandler } = useAppContext();

  const handleFilterEvents = _.debounce(
    (inputValue, coinList, filterCoinsHandler) => {
      //get all the coin symbols
      let coinSymbols = Object.keys(coinList);
      // get all the coin names, map symbol to name
      let coinNames = coinSymbols.map((sym) => coinList[sym].CoinName);
      //combine the 2 list above
      let allStringsToSearch = coinSymbols.concat(coinNames);
      console.log(allStringsToSearch);
      //fuzzy search
      let fuzzyResults = fuzzy
        .filter(inputValue, allStringsToSearch, {})
        .map((result) => result.string);

      //final result of the search
      let filteredCoins = _.pickBy(coinList, (result, symKey) => {
        let coinName = result.coinName;
        return (
          _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)
        );
      });
      filterCoinsHandler(filteredCoins);
    },
    500
  );

  const filterCoins = (e, filterCoinsHandler, coinList) => {
    let inputValue = e.target.value;
    if (!inputValue) {
      filterCoinsHandler(null);
      return;
    }
    handleFilterEvents(inputValue, coinList, filterCoinsHandler);
  };

  return (
    <SearchGridStyled>
      <h2>Search all coins</h2>
      <SearchInput
        onKeyUp={(e) => filterCoins(e, filterCoinsHandler, state.coinList)}
      />
    </SearchGridStyled>
  );
};

export default Search;
