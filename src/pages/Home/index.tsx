import React, { useEffect } from "react";
import { Layout } from "antd";
import { observer } from "mobx-react-lite";
import { useMst } from "store";
import { useSearchParams } from "react-router-dom";
import { LoaderWrap } from "components/LoaderWrap";
import NavHeader from "components/Header";
import UnitsCheckbox from "./components/UnitsCheckbox";
import ForecastDetail from "./components/ForecastDetial";
import ForecastList from "./components/ForecastList";
import TempLineChart from "./components/TempLineChart";

const { Content } = Layout;

const Home = observer(() => {
  const { forecastStore } = useMst();
  const [searchParams] = useSearchParams();

  const units = searchParams.get("units") || "c";
  const dt = searchParams.get("dt") || "";

  useEffect(() => {
    forecastStore.fetchWeathers(units, parseInt(dt));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <NavHeader />
      <Content style={{ padding: "20px", backgroundColor: "#f1f1f1" }}>
        <div>
          <div
            style={{
              width: "650px",
              margin: "auto",
              padding: "10px 40px",
              backgroundColor: "#FFFFFF",
              minHeight: "550px",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <LoaderWrap isLoading={forecastStore.isLoading}>
              <>
                <UnitsCheckbox />
                <ForecastDetail />
                <TempLineChart />
                <ForecastList />
              </>
            </LoaderWrap>
          </div>
        </div>
      </Content>
    </Layout>
  );
});

export default Home;
