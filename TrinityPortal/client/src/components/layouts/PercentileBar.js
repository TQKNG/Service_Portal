import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function ProgressBarStatus({
  rawScore,
  status,
  calculationType,
  wellBelowBenchmark,
  belowBenchmark,
  atBenchmark,
  aboveBenchmark,
}) {
  const calculateLeftPosition = (rawScore,status) => {
    // Calculate left position for percentile with fix position for each category
    if (status === "Well Below") {
      return 9; 
    } else if (status === "Below") {
      return 15; 
    } else if (status === "At Grade") {
      return 50; 
    } else if (status === "Exceeding") {
      return 70; 
    }

    // Calculate left position for benchmark status with dynamic position for each category
    let totalOfBenchmarkStatus = aboveBenchmark

    if(status === "Well Below Benchmark"){
      return 25; 
    } else if(status === "Below Benchmark"){
      return belowBenchmark/totalOfBenchmarkStatus * 100; 
    } else if(status === "At Benchmark"){
      return atBenchmark/totalOfBenchmarkStatus * 100; 
    } else if(status === "Above Benchmark"){
      return 70; 
    }
  };

  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center position-relative"
        style={{ minHeight: "4rem" }}
      >
        <div
          className="position-absolute top-0"
          style={{
            zIndex: 1,
            marginTop: "-0.6rem",
            left: `${calculateLeftPosition(rawScore,status)}%`, // Adjust left position based on rawScore and status
          }}
        >
          {rawScore}
          {rawScore && (
            <div className="position-absolute top-50">
              <span>&darr;</span>
            </div>
          )}
        </div>

        <div className="custom-progress-bar position-relative">
          {calculationType === 1 ? (
            <ProgressBar>
              <ProgressBar
                style={{
                  backgroundColor: `${
                    status === "Well Below" ? "#fc6868" : "white"
                  }`,
                  borderRight: "1px solid black",
                }}
                now={9}
                key={4}
              />
              <ProgressBar
                style={{
                  backgroundColor: `${
                    status === "Below" ? "#decf3f" : "white"
                  }`,
                  borderRight: "1px solid black",
                }}
                now={19}
                key={3}
              />
              <ProgressBar
                style={{
                  backgroundColor: `${
                    status === "At Grade" ? "#60bd68" : "white"
                  }`,
                  borderRight: "1px solid black",
                }}
                now={89}
                key={2}
              />
              <ProgressBar
                style={{
                  backgroundColor: `${
                    status === "Exceeding" ? "#4ab5eb" : "white"
                  }`,
                }}
                now={100}
                key={1}
              />
            </ProgressBar>
          ) : (
            <ProgressBar>
              <ProgressBar
                style={{
                  backgroundColor: `${
                    status === "Well Below Benchmark" ? "#fc6868" : "white"
                  }`,
                  borderRight: "1px solid black",
                }}
                now={wellBelowBenchmark}
                key={4}
              />
              <ProgressBar
                style={{
                  backgroundColor: `${
                    status === "Below Benchmark" ? "#decf3f" : "white"
                  }`,
                  borderRight: "1px solid black",
                }}
                now={belowBenchmark}
                key={3}
              />
              <ProgressBar
                style={{
                  backgroundColor: `${
                    status === "At Benchmark" ? "#60bd68" : "white"
                  }`,
                  borderRight: "1px solid black",
                }}
                now={atBenchmark}
                key={2}
              />
              <ProgressBar
                style={{
                  backgroundColor: `${
                    status === "Above Benchmark" ? "#4ab5eb" : "white"
                  }`,
                }}
                now={aboveBenchmark}
                key={1}
              />
            </ProgressBar>
          )}
        </div>
      </div>
    </>
  );
}

export default ProgressBarStatus;
