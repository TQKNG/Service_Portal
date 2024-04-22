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
  ReferenceLine,
} from "recharts";

const AverageScoreByBenchmarkCategory = ({ chartData }) => {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    // Set the stacked bars based on the calculation type
    if (chartData) {
      setBars([
        { dataKey: "Well Below", fill: "#fc6868" },
        { dataKey: "Below", fill: "#decf3f" },
        { dataKey: "At Grade", fill: "#60bd68" },
        { dataKey: "Exceeding", fill: "#4ab5eb" },
      ]);
    }
  }, [chartData]);

  // Format the data to have gap between bechmarks
  const formatData = (data) => {
    const dataStructure = [
      {
        id: "gap0",
        BenchMark: null,
        Category: null,
        AveragePercentile: null,
      },
      {
        id: "Fall - Break up the Word",
        BenchMark: "Fall",
        Category: "Break up the Word",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Fall - Letter Sounds",
        BenchMark: "Fall",
        Category: "Letter Sounds",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Fall - Name the Letter",
        BenchMark: "Fall",
        Category: "Name the Letter",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Fall - Say the first sound",
        BenchMark: "Fall",
        Category: "Say the first sound",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Fall - Silly Word(CLS)",
        BenchMark: "Fall",
        Category: "Silly Word(CLS)",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Fall - Silly Word(WWR)",
        BenchMark: "Fall",
        Category: "Silly Word(WWR)",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Fall - Story Reading(%)",
        BenchMark: "Fall",
        Category: "Story Reading(%)",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Fall - Story Reading(TWC)",
        BenchMark: "Fall",
        Category: "Story Reading(TWC)",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "gap1",
        BenchMark: null,
        Category: null,
        AveragePercentile: null,
      },
      {
        id: "Winter - Break up the Word",
        BenchMark: "Winter",
        Category: "Break up the Word",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Winter - Letter Sounds",
        BenchMark: "Winter",
        Category: "Letter Sounds",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Winter - Name the Letter",
        BenchMark: "Winter",
        Category: "Name the Letter",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Winter - Say the first sound",
        BenchMark: "Winter",
        Category: "Say the first sound",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Winter - Silly Word(CLS)",
        BenchMark: "Winter",
        Category: "Silly Word(CLS)",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Winter - Silly Word(WWR)",
        BenchMark: "Winter",
        Category: "Silly Word(WWR)",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Winter - Story Reading(%)",
        BenchMark: "Winter",
        Category: "Story Reading(%)",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Winter - Story Reading(TWC)",
        BenchMark: "Winter",
        Category: "Story Reading(TWC)",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "gap2",
        BenchMark: null,
        Category: null,
        AveragePercentile: null,
      },
      {
        id: "Spring - Break up the Word",
        BenchMark: "Spring",
        Category: "Break up the Word",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Spring - Letter Sounds",
        BenchMark: "Spring",
        Category: "Letter Sounds",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Spring - Name the Letter",
        BenchMark: "Spring",
        Category: "Name the Letter",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Spring - Say the first sound",
        BenchMark: "Spring",
        Category: "Say the first sound",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Spring - Silly Word(CLS)",
        BenchMark: "Spring",
        Category: "Silly Word(CLS)",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Spring - Silly Word(WWR)",
        BenchMark: "Spring",
        Category: "Silly Word(WWR)",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Spring - Story Reading(%)",
        BenchMark: "Spring",
        Category: "Story Reading(%)",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "Spring - Story Reading(TWC)",
        BenchMark: "Spring",
        Category: "Story Reading(TWC)",
        AveragePercentile: 0,
        "Well Below": 9,
        Below: 10,
        "At Grade": 70,
        Exceeding: 11,
      },
      {
        id: "gap3",
        BenchMark: null,
        Category: null,
        AveragePercentile: null,
      },
    ];
    const formattedData = data?.reduce((acc, d, index) => {
      const existingItem = acc.find((item) => item.id === d.id);
      if (!existingItem) {
        acc.push(d);
      } else {
        existingItem.AveragePercentile = d.AveragePercentile;
      }
      return acc;
    }, dataStructure);

    return formattedData;
  };

  // Custom x-axis tick
  const customXaxisTick = (tickProps, type) => {
    const { x, y, payload, index } = tickProps;
    const { value } = payload;

    const benchmarkName = value.split(" - ")[0];
    const categoryName = value.split(" - ")[1];

    // Check if the xAxisId is "Benchmark" to distinguish between the two X-axes
    if (type === "benchmark") {
      // Only display labels on Say first word category benchmark
      if (categoryName === "Say the first sound") {
        return (
          <>
            <text x={x} y={y + 100} textAnchor="middle" fontWeight="bold">
              {benchmarkName}
            </text>
          </>
        );
      } else {
        return null;
      }
    } else {
      return (
        <text
          x={x}
          y={y}
          textAnchor="end"
          transform={`rotate(-90, ${x}, ${y})`}
          fontSize={11}
        >
          {categoryName}
        </text>
      );
    }
  };

  // Customized label
  const customLabellist = (props) => {
    const { x, y, width, height, value, fill } = props;

    // Calculate the y position based on the value
    const labelY = value > 0 ? y + height / 2 : y;

    return (
      <text
        x={x + width / 2}
        y={labelY}
        fill={fill}
        textAnchor="middle"
        dominantBaseline={value > 0 ? "middle" : "baseline"}
      >
        {value?.toFixed(0)}
      </text>
    );
  };

  return (
    <div className="card shadow-lg border-0  py-5 px-4 mb-2 flex-fill">
      <h6>Progression of Student By Category Type - Percentile</h6>
      <div className="d-flex flex-column">
        <div className="">
          <div
            className="w-100 d-flex justify-content-start"
            style={{ fontSize: "0.7rem" }}
          >
            <b className="">Result</b>
          </div>
          <ResponsiveContainer minHeight={400}>
            <BarChart
              layout="horizontal"
              data={formatData(chartData)}
              margin={{
                top: 5,
                right: 30,
                left: 30,
                bottom: 150,
              }}
              barGap={0} // Adjust the gap between bars within the same category based on testData length
              barCategoryGap={10}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="id"
                group="category"
                tick={(props) => customXaxisTick(props, "category")}
                interval={0}
              />
              <XAxis
                dataKey="id"
                group="benchmark"
                axisLine={false}
                tickLine={false}
                interval={0}
                tick={(props) => customXaxisTick(props, "benchmark")}
                height={1}
                xAxisId="Benchmark"
              />
              <YAxis type="number" />

              {bars?.map((bar, index) => (
                <Bar
                  key={index}
                  dataKey={bar.dataKey}
                  fill={bar.fill}
                  stackId="Category"
                  barSize={50}
                  xAxisId="two"
                >
                  {/* <LabelList
                    dataKey={bar.dataKey}
                    position="insideEnd"
                    fill="white"
                    content={customLabellist}
                  /> */}
                </Bar>
              ))}
              <XAxis xAxisId="two" hide />

              {/*Percentile Indicator bar*/}
              <Bar
                dataKey="AveragePercentile"
                fill="rgba(0, 0, 0, 0.2)"
                barSize={50}
              >
                <LabelList
                  dataKey="AveragePercentile"
                  fill="white"
                  content={customLabellist}
                />
              </Bar>
              <XAxis xAxis="one" />
              <Legend
                verticalAlign="top"
                wrapperStyle={{ lineHeight: "30px" }}
              />
              {/* Reference lines */}
              <ReferenceLine
                y={20}
                stroke="green"
                strokeWidth={2}
                strokeDasharray="3 3"
                label={{
                  value: "At Grade(Min): 20",
                  position: "insideBottomLeft",
                  fill: "black",
                  background: "black",
                  fontSize: 12,
                }}
              />
              <ReferenceLine
                y={89}
                stroke="green"
                strokeWidth={2}
                strokeDasharray="3 3"
                label={{
                  value: "At Grade(Max): 89",
                  position: "insideTopLeft",
                  fill: "black",
                  background: "black",
                  fontSize: 12,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
          <div
            className="w-100 d-flex justify-content-end"
            style={{ fontSize: "0.7rem" }}
          >
            <b className="">Percentile</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AverageScoreByBenchmarkCategory;
