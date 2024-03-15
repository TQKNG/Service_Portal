import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const OverallResultChart = ({ chartData, calculationType }) => {

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    
    const percentage = parseFloat(value.split("-")[1]);

    console.log("TEST PERCENTAGE", percentage);

    // Check if the percentage is less than or equal to 50
    const isLessThanOrEqual50 = percentage <= 20;
    // Calculate the offset based on the condition
    const offset = isLessThanOrEqual50 ? 5 : 0;
  
    return (
      <text
        x={isLessThanOrEqual50 ? x + width + offset : x + width - offset}
        y={y + height - 5}
        fill={isLessThanOrEqual50 ? "black" : "white"}
        textAnchor={isLessThanOrEqual50 ? "start" : "end"}
      >
        {value}
      </text>
    );
  };

  const formatChartData = useMemo(() => {
    return chartData?.map((report) => ({
      label: calculationType === 0? report?.PercentileRank: report?.riskRank,
      data: report?.NumberOfStudent,
      percentage: report?.Percentage.toFixed(2), // Round to 2 decimal places
      fill:
        //1: Cutpoint, 0: Percentile
        calculationType === 0
          ? report?.PercentileRank === "Exceeding"
            ? "#4ab5eb"
            : report?.PercentileRank === "At Grade"
            ? "#60bd68"
            : report?.PercentileRank === "Below"
            ? "#decf3f"
            : "#fc6868"
          : report?.riskRank === "Above Benchmark"
          ? "#4ab5eb"
          : report?.riskRank === "At Benchmark"
          ? "#60bd68"
          : report?.riskRank === "Below Benchmark"
          ? "#decf3f"
          : "#fc6868",
      content:`${report?.NumberOfStudent} students-${report?.Percentage.toFixed(2)}%`,
      pos: report?.Percentage >0? 'top' : 'outside'
    }));
  }, [chartData, calculationType]);

  return (
    <div className="card shadow-lg border-0  py-5 px-4 mb-2 flex-fill">
      <h6>Overall Results - {!calculationType ? "Percentile" : "Benchmar Status"}</h6>
      <div className="d-flex flex-column">
        <div className="">
          <div
            className="w-100 d-flex justify-content-start"
            style={{ fontSize: "0.7rem" }}
          >
            <b className="">Result</b>
          </div>
          <ResponsiveContainer minHeight={300}>
            <BarChart
              layout="vertical"
              data={formatChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="label" type="category" tick={{ fontSize: 11 }} />
              <Bar
                dataKey="data"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              >
              <LabelList dataKey="content" position="insideRight" fill="black" content={renderCustomizedLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div
            className="w-100 d-flex justify-content-end"
            style={{ fontSize: "0.7rem" }}
          >
            <b className="">Number of Students</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallResultChart;
