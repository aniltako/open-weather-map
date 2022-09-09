import React from "react";
import { isImperialUnits } from "store/ForecastModel";
import { useSearchParams } from "react-router-dom";
import Deg from "./Deg";

const TempUnits = () => {
  const [searchParams] = useSearchParams();
  const tempUnits = searchParams.get("temp") || "c";

  return (
    <span style={{ fontSize: "16px", lineHeight: "24px" }}>
      <Deg />
      {isImperialUnits(tempUnits) ? "F" : "C"}
    </span>
  );
};

export default TempUnits;
