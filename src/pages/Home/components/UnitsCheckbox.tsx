import React from "react";
import { Checkbox } from "antd";
import { useMst } from "store";
import { useSearchParams } from "react-router-dom";
import { isImperialUnits } from "store/ForecastModel";

const UnitsCheckbox = () => {
  const { forecastStore } = useMst();
  const [searchParams, setSearchParams] = useSearchParams();

  const units = searchParams.get("units") || "c";
  const dt = searchParams.get("dt") || "";

  const handleChangeUnits = (unitsParam: { [key: string]: string }) => {
    const params: { [key: string]: string } = {};
    if (dt) {
      params.dt = dt;
    }
    setSearchParams({ ...params, ...unitsParam });
    forecastStore.fetchWeathers(unitsParam.units, parseInt(dt));
  };

  return (
    <div style={{ display: "flex", margin: "10px" }}>
      <Checkbox
        checked={!isImperialUnits(units)}
        onChange={() => handleChangeUnits({ units: "c" })}
      >
        Celsius
      </Checkbox>
      <Checkbox
        checked={isImperialUnits(units)}
        onChange={() => handleChangeUnits({ units: "f" })}
      >
        Fahrenheit
      </Checkbox>
    </div>
  );
};

export default UnitsCheckbox;
