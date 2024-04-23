import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  loadAssessmentsList,
  loadSchoolsList,
  loadClassroomsList,
  finalizeAssessment,
  loadResultsList,
} from "../../../actions/admin";
import { setAlert } from "../../../actions/alerts";
import Loading from "../../layouts/Loading";
import Alert from "../../layouts/Alert";
import { useHistory } from "react-router-dom";

const ResultFinalize = ({
  user,
  isAuthenticated,
  schoolsList,
  loadSchoolsList,
  schoolListLoading,
  resultsList,
  loadResultsList,
  resultListLoading,
  finalizeAssessment,
  setAlert,
}) => {
  const hist = useHistory();
  useEffect(() => {
    if (schoolsList.length === 0 && schoolListLoading) {
      loadSchoolsList();
    }

    if (user !== null) {
      setSchoolID(user.SchoolID);
    }
  }, [resultsList, resultListLoading, loadResultsList, user]);

  useEffect(() => {
    if (user) loadResultsList();
  }, [user]);

  const [formData, setFormData] = useState({
    BenchMarkID: 1,
    Year: 2021,
  });

  const [schoolID, setSchoolID] = useState(user === null ? 0 : user.SchoolID);

  const { BenchMarkID, Year } = formData;

  const categorizeScore = (score, ranges) => {
    if (
      score >= ranges.aboveBenchmark[0] &&
      score <= ranges.aboveBenchmark[1]
    ) {
      return 1;
    } else if (
      score >= ranges.atBenchmark[0] &&
      score <= ranges.atBenchmark[1]
    ) {
      return 2;
    } else if (
      score >= ranges.belowBenchmark[0] &&
      score <= ranges.belowBenchmark[1]
    ) {
      return 3;
    } else if (
      score >= ranges.wellBelowBenchmark[0] &&
      score <= ranges.wellBelowBenchmark[1]
    ) {
      return 4;
    } else {
      return 0;
    }
  };

  const rankGrades = (arr) => {
    const obj = {};
    const result = [];
    console.log("Test arrr", arr);
    arr.forEach((item) => {
      const key = "A" + item.AssessmentID.split("-").join("");
      obj[key] = [...(obj[key] || []), item];
    });
    for (const property in obj) {
      if (obj[property][0].CategoryID !== 4) {
        let scores = new Set(obj[property].map((key) => key.TotalScore));
        let ordered_scores = Array.from(scores).sort((a, b) => a - b);
        obj[property].forEach((item) => {
          let ranges = {};
          item.Rank = ordered_scores.indexOf(item.TotalScore) + 1;
          item.Percentile = Math.round(
            (item.Rank / ordered_scores.length) * 100
          );
          ranges["aboveBenchmark"] = [
            item.aboveBenchmarkMin,
            item.aboveBenchmarkMax,
          ];
          ranges["atBenchmark"] = [item.atBenchmarkMin, item.atBenchmarkMax];
          ranges["belowBenchmark"] = [
            item.belowBenchmarkMin,
            item.belowBenchmarkMax,
          ];
          ranges["wellBelowBenchmark"] = [
            item.wellBelowBenchmarkMin,
            item.wellBelowBenchmarkMax,
          ];
          item.riskStatus = categorizeScore(item.TotalScore, ranges);
          result.push(item);
        });
      } else {
        // CLS
        let scores = new Set(
          obj[property].map((key) =>
            parseInt((key.TotalScore + "").slice(0, -3))
          )
        );

        let ordered_scores = Array.from(scores).sort((a, b) => a - b);
        console.log(ordered_scores);
        obj[property].forEach((item) => {
          let ranges = {};
          item.Rank =
            ordered_scores.indexOf(
              parseInt((item.TotalScore + "").slice(0, -3))
            ) + 1;

          item.Percentile = Math.round(
            (item.Rank / ordered_scores.length) * 100
          );
          ranges["aboveBenchmark"] = [
            item.aboveBenchmarkMin,
            item.aboveBenchmarkMax,
          ];
          ranges["atBenchmark"] = [item.atBenchmarkMin, item.atBenchmarkMax];
          ranges["belowBenchmark"] = [
            item.belowBenchmarkMin,
            item.belowBenchmarkMax,
          ];
          ranges["wellBelowBenchmark"] = [
            item.wellBelowBenchmarkMin,
            item.wellBelowBenchmarkMax,
          ];
          item.riskStatus = categorizeScore(
            parseInt((item.TotalScore + "").slice(0, -3)),
            ranges
          );

          result.push(item);
        });
        // WWR
        scores = new Set(
          obj[property].map((key) => parseInt((key.TotalScore + "").slice(-3)))
        );
        ordered_scores = Array.from(scores).sort((a, b) => a - b);
        console.log(ordered_scores);
        obj[property].forEach((item) => {
          let ranges = {};
          item.Rank = parseInt(
            item.Rank +
              (
                "000" +
                (ordered_scores.indexOf(
                  parseInt((item.TotalScore + "").slice(-3))
                ) +
                  1)
              ).slice(-4)
          );

          item.Percentile = parseInt(
            item.Percentile +
              (
                "00" +
                Math.round(
                  ((ordered_scores.indexOf(
                    parseInt((item.TotalScore + "").slice(-3))
                  ) +
                    1) /
                    ordered_scores.length) *
                    100
                )
              ).slice(-3)
          );
          ranges["aboveBenchmark"] = [
            item.aboveBenchmarkMin,
            item.aboveBenchmarkMax,
          ];
          ranges["atBenchmark"] = [item.atBenchmarkMin, item.atBenchmarkMax];
          ranges["belowBenchmark"] = [
            item.belowBenchmarkMin,
            item.belowBenchmarkMax,
          ];
          ranges["wellBelowBenchmark"] = [
            item.wellBelowBenchmarkMin,
            item.wellBelowBenchmarkMax,
          ];
          item.riskStatus = categorizeScore(
            parseInt((item.TotalScore + "").slice(0, -3)),
            ranges
          );

          result.push(item);
        });
      }
    }

    return result;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (schoolID !== 0) {
      let fitleredResult = resultsList?.filter(
        (item) =>
          item.year === parseInt(Year) &&
          item.BenchMarkID === parseInt(BenchMarkID)&&
          item.SchoolID === parseInt(schoolID) &&
          item.TotalScore !== null
      );

      finalizeAssessment(rankGrades(fitleredResult)).then(() => {
        setFormData({
          BenchMarkID: 1,
          Year: 2021,
        });
        setTimeout(() => {
          hist.push("/admin/result");
        }, 3000);
      });
    } else {
      setAlert("Please enter values", "danger");
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <Fragment>
      {user !== null &&
      isAuthenticated &&
      !schoolListLoading &&
      !resultListLoading ? (
        <div className=" container mx-auto my-5" style={{ paddingTop: "80px" }}>
          <div className="mb-3 ">
            <div className="d-sm-flex  w-100 align-items-center justify-content-between">
              <div className="d-flex mb-2 mb-sm-0">
                <div
                  className="admin-back mx-2  rounded-circle d-flex align-items-center justify-content-center txt-primary"
                  onClick={() => {
                    hist.goBack();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-arrow-left-short"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                    />
                  </svg>
                </div>
                <h4 className="m-0">Assessment</h4>
              </div>
            </div>
          </div>
          <div className="d-flex  position-relative ">
            <div className="container card shadow border-0 w-100 ">
              <div className="card-body  mt-1">
                <h4>Benchmark Calculation</h4>
                <Alert />

                <form onSubmit={(e) => onSubmit(e)}>
                  {user.SchoolID === null && (
                    <div className="mb-3">
                      <label for="inputAssessment">
                        <b>School</b>
                      </label>
                      <select
                        className="form-select form-control border-primary"
                        aria-label="Default select example"
                        id="SchoolID"
                        value={schoolID}
                        onChange={(e) => setSchoolID(e.target.value)}
                      >
                        <option value={0}>Select School</option>
                        {user.UserTypeID === 6
                          ? schoolsList
                              .sort((a, b) => {
                                const nameA = a.Name;
                                const nameB = b.Name;
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }
                                return 0;
                              })
                              .filter((school) => {
                                return (
                                  user &&
                                  user.schoolIds &&
                                  user.schoolIds
                                    .split(",")
                                    .map((id) => parseInt(id.trim()))
                                    .includes(school.SchoolID)
                                );
                              })
                              .map((school) => {
                                return (
                                  <option
                                    key={school.SchoolID}
                                    value={school.SchoolID}
                                  >
                                    {school.Name}
                                  </option>
                                );
                              })
                          : schoolsList
                              .sort((a, b) => {
                                const nameA = a.Name;
                                const nameB = b.Name;
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }
                                return 0;
                              })
                              .map((school) => {
                                return (
                                  <option
                                    key={school.SchoolID}
                                    value={school.SchoolID}
                                  >
                                    {school.Name}
                                  </option>
                                );
                              })}
                      </select>
                    </div>
                  )}

                  <div className="mt-3">
                    <label for="inputAssessment">
                      <b>Benchmark</b>
                    </label>
                    <select
                      className="form-select form-control border-primary"
                      aria-label="Default select"
                      value={BenchMarkID}
                      id="BenchMarkID"
                      onChange={(e) => onChange(e)}
                    >
                      <option value={1}>Benchmark 1 – Fall</option>
                      <option value={2}>Benchmark 2 – Winter</option>
                      <option value={3}>Benchmark 3 – Spring</option>
                      <option value={4}>Progress Monitoring</option>
                    </select>
                  </div>
                  <div className="mt-3">
                    <label for="inputAssessment">
                      <b>Year</b>
                    </label>
                    <select
                      className="form-select form-control border-primary"
                      aria-label="Default select"
                      value={Year}
                      id="Year"
                      onChange={(e) => onChange(e)}
                    >
                      <option value={2020}>2019-2020</option>
                      <option value={2021}>2020-2021</option>
                      <option value={2022}>2021-2022</option>
                      <option value={2023}>2022-2023</option>
                      <option value={2024}>2023-2024</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center justify-content-end my-3">
                    <button
                      type="submit"
                      className="button-primary btn-block btn px-5"
                    >
                      Finalize
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center h-100 justify-content-center">
          <Loading />
        </div>
      )}
    </Fragment>
  );
};

ResultFinalize.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  schoolsList: PropTypes.array.isRequired,
  loadSchoolsList: PropTypes.func.isRequired,
  finalizeAssessment: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  schoolsList: state.admin.schoolsList,
  schoolListLoading: state.admin.schoolListLoading,
  resultsList: state.admin.resultsList,
  resultListLoading: state.admin.resultListLoading,
});

export default connect(mapStateToProps, {
  loadSchoolsList,
  loadResultsList,
  finalizeAssessment,
  setAlert,
})(ResultFinalize);
