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

const OverallResultsProgression = ({ chartData, calculationType }) => {
  const [bars, setBars] = useState([]);

  useEffect(() => {
    // Set the stacked bars based on the calculation type
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

  // Format the data to have gap between bechmarks
  const formatData = (data) => {
    if (calculationType === 0) {
      var dataStructure = [
        {
          id: "gap0",
          BenchMark: null,
          Category: null,
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Fall - Break up the Word",
          BenchMark: "Fall",
          Category: "Break up the Word",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Fall - Letter Sounds",
          BenchMark: "Fall",
          Category: "Letter Sounds",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Fall - Name the Letter",
          BenchMark: "Fall",
          Category: "Name the Letter",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Fall - Say the first sound",
          BenchMark: "Fall",
          Category: "Say the first sound",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Fall - Silly Word(CLS)",
          BenchMark: "Fall",
          Category: "Silly Word(CLS)",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Fall - Silly Word(WWR)",
          BenchMark: "Fall",
          Category: "Silly Word(WWR)",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Fall - Story Reading(TWC)",
          BenchMark: "Fall",
          Category: "Story Reading(TWC)",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Fall - Story Reading(%)",
          BenchMark: "Fall",
          Category: "Story Reading(%)",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },

        {
          id: "gap1",
          BenchMark: null,
          Category: null,
          AverageRawScore: null,
        },
        {
          id: "Winter - Break up the Word",
          BenchMark: "Winter",
          Category: "Break up the Word",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Winter - Letter Sounds",
          BenchMark: "Winter",
          Category: "Letter Sounds",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Winter - Name the Letter",
          BenchMark: "Winter",
          Category: "Name the Letter",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Winter - Say the first sound",
          BenchMark: "Winter",
          Category: "Say the first sound",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Winter - Silly Word(CLS)",
          BenchMark: "Winter",
          Category: "Silly Word(CLS)",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Winter - Silly Word(WWR)",
          BenchMark: "Winter",
          Category: "Silly Word(WWR)",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Winter - Story Reading(TWC)",
          BenchMark: "Winter",
          Category: "Story Reading(TWC)",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Winter - Story Reading(%)",
          BenchMark: "Winter",
          Category: "Story Reading(%)",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "gap2",
          BenchMark: null,
          Category: null,
          AverageRawScore: null,
        },
        {
          id: "Spring - Break up the Word",
          BenchMark: "Spring",
          Category: "Break up the Word",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Spring - Letter Sounds",
          BenchMark: "Spring",
          Category: "Letter Sounds",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Spring - Name the Letter",
          BenchMark: "Spring",
          Category: "Name the Letter",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Spring - Say the first sound",
          BenchMark: "Spring",
          Category: "Say the first sound",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Spring - Silly Word(CLS)",
          BenchMark: "Spring",
          Category: "Silly Word(CLS)",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Spring - Silly Word(WWR)",
          BenchMark: "Spring",
          Category: "Silly Word(WWR)",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Spring - Story Reading(TWC)",
          BenchMark: "Spring",
          Category: "Story Reading(TWC)",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "Spring - Story Reading(%)",
          BenchMark: "Spring",
          Category: "Story Reading(%)",
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
        {
          id: "gap3",
          BenchMark: null,
          Category: null,
          Exceeding: null,
          "At Grade": null,
          Below: null,
          "Well Below": null,
        },
      ];
    } else {
      dataStructure = [
        {
          id: "gap0",
          BenchMark: null,
          Category: null,
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Fall - Break up the Word",
          BenchMark: "Fall",
          Category: "Break up the Word",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Fall - Letter Sounds",
          BenchMark: "Fall",
          Category: "Letter Sounds",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Fall - Name the Letter",
          BenchMark: "Fall",
          Category: "Name the Letter",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Fall - Say the first sound",
          BenchMark: "Fall",
          Category: "Say the first sound",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Fall - Silly Word(CLS)",
          BenchMark: "Fall",
          Category: "Silly Word(CLS)",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Fall - Silly Word(WWR)",
          BenchMark: "Fall",
          Category: "Silly Word(WWR)",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Fall - Story Reading(%)",
          BenchMark: "Fall",
          Category: "Story Reading(%)",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Fall - Story Reading(TWC)",
          BenchMark: "Fall",
          Category: "Story Reading(TWC)",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "gap1",
          BenchMark: null,
          Category: null,
          AverageRawScore: null,
        },
        {
          id: "Winter - Break up the Word",
          BenchMark: "Winter",
          Category: "Break up the Word",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Winter - Letter Sounds",
          BenchMark: "Winter",
          Category: "Letter Sounds",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Winter - Name the Letter",
          BenchMark: "Winter",
          Category: "Name the Letter",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Winter - Say the first sound",
          BenchMark: "Winter",
          Category: "Say the first sound",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Winter - Silly Word(CLS)",
          BenchMark: "Winter",
          Category: "Silly Word(CLS)",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Winter - Silly Word(WWR)",
          BenchMark: "Winter",
          Category: "Silly Word(WWR)",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Winter - Story Reading(%)",
          BenchMark: "Winter",
          Category: "Story Reading(%)",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Winter - Story Reading(TWC)",
          BenchMark: "Winter",
          Category: "Story Reading(TWC)",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "gap2",
          BenchMark: null,
          Category: null,
          AverageRawScore: null,
        },
        {
          id: "Spring - Break up the Word",
          BenchMark: "Spring",
          Category: "Break up the Word",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Spring - Letter Sounds",
          BenchMark: "Spring",
          Category: "Letter Sounds",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Spring - Name the Letter",
          BenchMark: "Spring",
          Category: "Name the Letter",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Spring - Say the first sound",
          BenchMark: "Spring",
          Category: "Say the first sound",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Spring - Silly Word(CLS)",
          BenchMark: "Spring",
          Category: "Silly Word(CLS)",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Spring - Silly Word(WWR)",
          BenchMark: "Spring",
          Category: "Silly Word(WWR)",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Spring - Story Reading(%)",
          BenchMark: "Spring",
          Category: "Story Reading(%)",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "Spring - Story Reading(TWC)",
          BenchMark: "Spring",
          Category: "Story Reading(TWC)",
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
        {
          id: "gap3",
          BenchMark: null,
          Category: null,
          "Above Benchmark": null,
          "At Benchmark": null,
          "Below Benchmark": null,
          "Well Below Benchmark": null,
        },
      ];
    }

    const formattedData = data?.reduce((acc, d, index) => {
      const existingItem = acc.find((item) => item.id === d.id);
      if (!existingItem) {
        acc.push(d);
      } else {
        if (calculationType === 0) {
          existingItem["Exceeding"] = d["Exceeding"];
          existingItem["At Grade"] = d["At Grade"];
          existingItem["Below"] = d["Below"];
          existingItem["Well Below"] = d["Well Below"];
        } else {
          existingItem["Above Benchmark"] = d["Above Benchmark"];
          existingItem["At Benchmark"] = d["At Benchmark"];
          existingItem["Below Benchmark"] = d["Below Benchmark"];
          existingItem["Well Below Benchmark"] = d["Well Below Benchmark"];
        }
      }
      return acc;
    }, dataStructure);

    return formattedData;
  };

  // Customized label
  const customLabellist = (props) => {
    const { x, y, width, height, value, fill } = props;
    // Width of the bar
    const MIN_HEIGHT= 20;
    if (height < MIN_HEIGHT) return null;

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
  const customTooltip = ({ active, payload, label }) => {
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

  return (
    <div className="card shadow-lg border-0  py-5 px-4 mb-2 flex-fill">
      <h6>
        Progression of Overall Results By Assessment Type-{" "}
        {!calculationType ? "Percentile" : "Benchmark Status"}
      </h6>
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
                bottom: 110,
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
              <Tooltip content={customTooltip} />
              {bars?.map((bar, index) => (
                <>
                  <Bar
                    key={index}
                    dataKey={bar.dataKey}
                    fill={bar.fill}
                    stackId="Category"
                    barSize={50}
                  >
                    <LabelList
                      dataKey={bar.dataKey}
                      position="insideEnd"
                      fill="white"
                      content={customLabellist}
                    />
                  </Bar>
                </>
              ))}
              <Legend
                verticalAlign="top"
                wrapperStyle={{ lineHeight: "30px" }}
              />
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

export default OverallResultsProgression;
