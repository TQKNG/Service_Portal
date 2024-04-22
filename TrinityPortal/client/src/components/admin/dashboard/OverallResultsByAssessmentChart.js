import { set } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

const OverallResultsByAssessmentType = ({ chartData, calculationType }) => {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    if (chartData) {
      if (calculationType === 0) {
        setBars([
          { dataKey: "Exceeding", fill: "#4ab5eb" },
          { dataKey: "At Grade", fill: "#60bd68" },
          { dataKey: "Below", fill: "#decf3f" },
          { dataKey: "Well Below", fill: "#fc6868" },
        ]);
      } else {
        setBars([
          { dataKey: "Above Benchmark", fill: "#4ab5eb" },
          { dataKey: "At Benchmark", fill: "#60bd68" },
          { dataKey: "Below Benchmark", fill: "#decf3f" },
          { dataKey: "Well Below Benchmark", fill: "#fc6868" },
        ]);
      }
    }
  }, [chartData, calculationType]);

  // Customized label
  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value, fill } = props;

    // Width of the bar
    const MIN_WIDTH = 10;
    if (width < MIN_WIDTH) return null;

    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill={fill}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((acc, p) => acc + p.value, 0);
      return (
        <div
          className="custom-tooltip"
          style={{ backgroundColor: "white", padding: "20px" }}
        >
          <p
            className="label"
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              borderRadius: "3px",
              textAlign: "center",
            }}
          >
            {label}
          </p>
          {payload.map((p) => {
            const bar = bars.find((bar) => bar.dataKey === p.name);

            const circleStyle = {
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: bar ? bar.fill : "#000",
              display: "inline-block",
              marginRight: "5px",
            };
            return (
              <p key={p.name} style={{ color: bar ? "black" : "#000" }}>
                <span style={circleStyle}></span> {/* Circle for indication */}
                {`${p.name}: ${p.value} students (${(
                  (p.value / total) *
                  100
                ).toFixed(2)}%)`}
              </p>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="card shadow-lg border-0  py-5 px-4 mb-2 flex-fill">
      <h6>
        Top 5 Favorite Time Spending
        {/* {!calculationType ? "Percentile" : "Benchmark Status"} */}
      </h6>
      <div className="d-flex flex-column">
        <div className="">
          <div
            className="w-100 d-flex justify-content-start"
            style={{ fontSize: "0.7rem" }}
          >
            <b className="">Result</b>
          </div>
          <ResponsiveContainer minHeight={300}>
            {/* <BarChart
              layout="vertical"
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 30,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />z
              <YAxis
                dataKey="Category"
                type="category"
                interval={0}
                width={150}
                tick={{ fontSize: 11 }}
              />
              <Tooltip content={CustomTooltip} />
              {bars?.map((bar, index) => (
                <Bar
                  key={index}
                  dataKey={bar.dataKey}
                  fill={bar.fill}
                  stackId="a"
                  barSize={60}
                >
                  <LabelList
                    dataKey={bar.dataKey}
                    position="insideEnd"
                    fill="white"
                    content={renderCustomizedLabel}
                  />
                </Bar>
              ))}
              <Legend
                verticalAlign="top"
                wrapperStyle={{ lineHeight: "30px" }}
              />
            </BarChart> */}
            <img src={process.env.PUBLIC_URL + `/chartPlaceholder.png`} alt="" />
          </ResponsiveContainer>
          <div
            className="w-100 d-flex justify-content-end"
            style={{ fontSize: "0.7rem" }}
          >
            <b className="">hh:mm:ss</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallResultsByAssessmentType;
