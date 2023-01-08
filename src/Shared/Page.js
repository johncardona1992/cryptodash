import React from "react";
import { useAppContext } from "../App/AppProvider";

const Page = (props) => {
  const { state } = useAppContext();
  return state.page !== props.name ? null : <div>{props.children}</div>;
};

export default Page;
