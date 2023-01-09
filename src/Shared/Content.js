import React, { Fragment } from "react";
import { useAppContext } from "../App/AppProvider";

const Content = (props) => {
  const { state } = useAppContext();

  return (
    <Fragment>
      {!state.coinList && <div>Loading Coins</div>}
      {(!state.firstVisit && !state.prices && <div>Loading Prices</div>) || (
        <div>{props.children}</div>
      )}
    </Fragment>
  );
};

export default Content;
