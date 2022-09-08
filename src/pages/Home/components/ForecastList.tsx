import React from "react";
import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useMst } from "store";
import { IWeatherModel, WeatherListGroupByDate } from "store/WeatherModel";
import moment from "moment";
import Deg from "./Deg";
import { useSearchParams } from "react-router-dom";

const ForecastList = observer(() => {
  const { forecastStore } = useMst();
  const [searchParams, setSearchParams] = useSearchParams();

  const units = searchParams.get("units") || "c";

  const handleChangeWeather = (forecastItem: IWeatherModel) => {
    const params: { [key: string]: string } = {};
    if (units) {
      params.units = units;
    }
    setSearchParams({ ...params, ...{ dt: `${forecastItem.dt}` } });
    forecastStore.setSelectedDate(forecastItem.dt);
  };

  const list = forecastStore.weatherListGroupByDate.map(
    (forecastGroupByDate: WeatherListGroupByDate) => {
      const formattedDate = Object.keys(forecastGroupByDate)[0];
      const forecastList = forecastGroupByDate[formattedDate];
      const forecastItem = forecastList[0];
      return (
        <Col
          span={3}
          key={forecastItem.dt}
          onClick={() => handleChangeWeather(forecastItem)}
          className="forecast-item"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <div>{moment(formattedDate).format("ddd")}</div>
          <div>
            <img src="/images/thunderstorms.png" alt="thunderstorms" />
          </div>
          <div>
            <span>
              {Math.trunc(forecastItem.main.temp_max)}
              <Deg />
            </span>
            <span style={{ marginLeft: "2px", opacity: "0.5" }}>
              {Math.trunc(forecastItem.main.temp_min)}
              <Deg />
            </span>
          </div>
        </Col>
      );
    }
  );

  return (
    <Row
      justify="center"
      style={{ textAlign: "center", justifyContent: "space-between" }}
    >
      {list}
    </Row>
  );
});

export default ForecastList;