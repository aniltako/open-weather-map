import React from "react";
import { Col, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useMst } from "store";
import { isImperialUnits } from "store/WeatherModel";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import TempUnits from "./TempUnits";
import { dddd } from "constants/DateConstant";

const ForecastDetail = observer(() => {
  const { forecastStore } = useMst();
  const { selectedWeather } = forecastStore;
  const [searchParams] = useSearchParams();

  const tempUnits = searchParams.get("temp") || "c";
  return (
    <Row>
      <Row>
        <Col style={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src="/images/thunderstorms.png"
            alt={selectedWeather?.weather?.[0].description}
          />
          <div style={{ paddingLeft: "10px" }}>
            <div style={{ display: "flex" }}>
              <div style={{ fontSize: "55px", lineHeight: "60px" }}>
                {selectedWeather?.main &&
                  Math.trunc(selectedWeather?.main.temp)}
              </div>
              <div>
                <TempUnits />
              </div>
            </div>
          </div>
        </Col>
        <Col style={{ paddingLeft: "10px", opacity: "0.5" }}>
          <div>Precipitation: {selectedWeather?.pop}%</div>
          <div>Humility: {selectedWeather?.main.humidity}%</div>
          <div>
            Wind: {selectedWeather?.wind.speed}{" "}
            {isImperialUnits(tempUnits) ? "miles/hr" : "meter/sec"}
          </div>
        </Col>
      </Row>

      <Row gutter={[0, 2]} style={{ textAlign: "right" }}>
        <Col span={24} style={{ fontSize: "24px", lineHeight: "26px" }}>
          {forecastStore.data?.city.name}
        </Col>
        <Col
          span={24}
          style={{ fontSize: "20px", lineHeight: "20px", opacity: "0.5" }}
        >
          {selectedWeather?.dt &&
            moment(selectedWeather.dt * 1000).format(dddd)}
        </Col>
        <Col
          span={24}
          style={{ fontSize: "16px", lineHeight: "20px", opacity: "0.5" }}
        >
          {selectedWeather?.weather?.[0].description}
        </Col>
      </Row>
    </Row>
  );
});

export default ForecastDetail;
