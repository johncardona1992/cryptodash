import basicLineChart from "./HighchartsConfig";
import React from "react";
import { useAppContext } from "../App/AppProvider";
import { Tile } from "../Shared/Tile";
import HighChartsTheme from "./HighChartsTheme";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ChartSelect from "./ChartSelect";
Highcharts.setOptions(HighChartsTheme);

const PriceChart = () => {
  const { state, changeChartSelect } = useAppContext();
  return (
    <Tile>
      <ChartSelect defaultValue="months" onChange={e => changeChartSelect(e.target.value)}>
        <option value="days"> Days </option>
        <option value="weeks"> Weeks </option>
        <option value="months"> Months </option>
      </ChartSelect>
      {state.historical ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={basicLineChart(state.historical)}
        />
      ) : (
        <div>Loading...</div>
      )}
    </Tile>
  );
};

export default PriceChart;
