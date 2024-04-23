import React, { useMemo, useState } from "react";
import { Chart } from "react-charts";

const AverageScorePerGradeByBenchMarkChart = ({ reports, classroom }) => {
  const [type, setType] = useState("bar");
  const format = (data, gradeID, benchMarkID) => {
    const filteredData = data.filter(
      (item) => item.GradeID === gradeID && item.BenchMarkID === benchMarkID
    );
    let average = filteredData.reduce((a, b) => {
      return a + b.Percentile;
    }, 0);
    average = average / filteredData.length;
    console.log(average, filteredData);
    if (isNaN(average)) {
      return null;
    }
    return average;
  };

  const data = useMemo(
    () =>
      classroom === true
        ? [
            {
              label: `Grade ${reports[0].GradeID}`,

              data: [
                ["Fall", format(reports, 1, 1)],
                ["Winter", format(reports, 1, 2)],
                ["Spring", format(reports, 1, 3)],
                ["", null],
              ],
            },
          ]
        : [
            {
              label: "Grade 1",

              data: [
                ["Fall", format(reports, 1, 1)],
                ["Winter", format(reports, 1, 2)],
                ["Spring", format(reports, 1, 3)],
              ],
            },
            {
              label: "Grade 2",
              data: [
                ["Fall", format(reports, 2, 1)],
                ["Winter", format(reports, 2, 2)],
                ["Spring", format(reports, 2, 3)],
              ],
            },
            {
              label: "Grade 3",
              data: [
                ["Fall", format(reports, 3, 1)],
                ["Winter", format(reports, 3, 2)],
                ["Spring", format(reports, 3, 3)],
              ],
            },
            {
              label: "Grade 4",
              data: [
                ["Fall", format(reports, 4, 1)],
                ["Winter", format(reports, 4, 2)],
                ["Spring", format(reports, 4, 3)],
              ],
            },
            {
              label: "Grade 5",
              data: [
                ["Fall", format(reports, 5, 1)],
                ["Winter", format(reports, 5, 2)],
                ["Spring", format(reports, 5, 3)],
              ],
            },
            {
              label: "Grade 6",
              data: [
                ["Fall", format(reports, 6, 1)],
                ["Winter", format(reports, 6, 2)],
                ["Spring", format(reports, 6, 3)],
              ],
            },
          ],
    [reports, classroom]
  );

  const series = useMemo(
    () => ({
      type: type,
    }),
    [type, reports]
  );
  const axes = useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear", stacked: false },
    ],
    [reports]
  );
  return (
    <div
      className="card shadow-lg border-0  py-5 px-4 mb-2"
      style={{
        width:"100%",
        height: "400px",
      }}
    >
      <h6>Progression of Overall Results by Asssessment Type</h6>
      <div
        style={{
          height: "200px",
        }}
      >
        <div className="d-flex justify-content-end ">
          <select
            className="d-inline-block"
            aria-label="Default select example"
            id="type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value={"bar"}>Bar</option>
            <option value={"line"}>Line</option>
            <option value={"bubble"}>Bubble</option>
          </select>
        </div>
        <div
          className="w-100 d-flex justify-content-start my-2"
          style={{ fontSize: "0.7rem" }}
        >
          <b className="">Grade Mark</b>
        </div>
        <Chart data={data} axes={axes} series={series} tooltip={true} />
        <div
          className="w-100 d-flex justify-content-end my-2"
          style={{ fontSize: "0.7rem" }}
        >
          <b className="">Benchmark</b>
        </div>
        {classroom !== true && (
          <div
            className="d-flex justify-content-between"
            style={{ fontSize: "10px" }}
          >
            <div className="d-flex align-items-center">
              <div
                className="p-1 d-inline-block"
                style={{
                  height: "10px",
                  width: "10px",
                  backgroundColor: "#4ab5eb",
                }}
              ></div>
              <div className="mx-2">Grade 1</div>
            </div>
            <div className="d-flex align-items-center ">
              <div
                className="p-1 d-inline-block"
                style={{
                  height: "10px",
                  width: "10px",
                  backgroundColor: "#fc6868",
                }}
              ></div>
              <div className="mx-2">Grade 2</div>
            </div>
            <div className="d-flex align-items-center">
              <div
                className="p-1 d-inline-block"
                style={{
                  height: "10px",
                  width: "10px",
                  backgroundColor: "#decf3f",
                }}
              ></div>
              <div className="mx-2">Grade 3</div>
            </div>
            <div className="d-flex align-items-center">
              <div
                className="p-1 d-inline-block"
                style={{
                  height: "10px",
                  width: "10px",
                  backgroundColor: "#60bd68",
                }}
              ></div>
              <div className="mx-2">Grade 4</div>
            </div>
            <div className="d-flex align-items-center">
              <div
                className="p-1 d-inline-block"
                style={{
                  height: "10px",
                  width: "10px",
                  backgroundColor: "#faa43a",
                }}
              ></div>
              <div className="mx-2">Grade 5</div>
            </div>
            <div className="d-flex align-items-center">
              <div
                className="p-1 d-inline-block"
                style={{
                  height: "10px",
                  width: "10px",
                  backgroundColor: "#c63b89",
                }}
              ></div>
              <div className="mx-2">Grade 6</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AverageScorePerGradeByBenchMarkChart;
