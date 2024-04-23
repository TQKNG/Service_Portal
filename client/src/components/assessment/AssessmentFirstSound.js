import React, { useState, Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

const AssessmentFirstSound = ({
  assessment,
  forceUpdate,
  setRestartKey,
  restartKey,
  setDone,
  setPlay,
  updateAssessmentResult,
  assessmentResults,
  deleteResult,
  clearResult,
  user,
  isAuthenticated,
}) => {
  const hist = useHistory();
  const location = useLocation();
  const format = (data) => {
    const Body = data.Body.split(",");
    const Solution = data.Solution.split(",");
    const SolutionDetails = data.SolutionDetails.split(",");
    console.log(SolutionDetails);

    let arr = [];
    for (let i = 0; i < Body.length; i++) {
      arr.push({
        word: Body[i],
        solution: Solution[i],
        solutionDetails: SolutionDetails[i].replace(/\s+/g, " ").split(" "),
      });
    }
    return arr;
  };

  const zeros = (arr) => {
    let r = [];
    for (let i = 0; i < arr.length; i++) {
      r.push(0);
    }
    return r;
  };

  const [solutionLabel, setSolutionLabel] = useState(
    assessmentResults.SoundsIndex !== null
      ? assessmentResults.SoundsIndex.split(",")
      : zeros(assessment.Body.split(","))
  );

  const [solutionDetailsLabel, setSolutionDetailsLabel] = useState(
    assessmentResults.SoundsLength !== null
      ? assessmentResults.SoundsLength.split(",")
      : zeros(assessment.Body.split(","))
  );

  const [scores, setScores] = useState(
    assessmentResults.Scores !== null
      ? () => {
          assessmentResults.Scores.split(",");
          let temp = [];
          for (let i = 0; i < assessmentResults.Scores.split(",").length; i++) {
            temp[i] = parseInt(assessmentResults.Scores.split(",")[i]);
          }
          return temp;
        }
      : []
  );

  const [comment, SetComment] = useState(
    assessmentResults.Comment === null ? "" : assessmentResults.Comment
  );

  const [doneCurrent, setDoneCurrent] = useState(
    location.pathname.includes("/assessment/preview/")
  );

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      ...assessmentResults,
      TotalScore: Math.round(
        (scores.reduce((a, b) => {
          if (a === "") {
            return b;
          } else if (b === "") {
            return a;
          } else {
            return a + b;
          }
        }, 0) /
          (assessment.Body.split(",").length * 2)) *
          100
      ),
      Scores: scores.join(","),
      CategoryID: assessment.CategoryID,
      Comment: comment,
      Year: assessmentResults.year,
      SoundsIndex: solutionLabel,
      SoundsLength: solutionDetailsLabel,
    };
    updateAssessmentResult(data).then(() => {
      hist.push(`/admin/result`);
    });
  };
  return (
    <form className="w-80 mx-auto" onSubmit={(e) => onSubmit(e)}>
      <table className=" table bg-light">
        <thead>
          <tr>
            <th>Test Items</th>
            <th>Correct / 2 points</th>
            <th>Correct / 1 points</th>
            <th>Incorrect</th>
            {isAuthenticated && <th>Score</th>}
          </tr>
        </thead>
        <tbody>
          {format(assessment).map((word, id) => {
            return (
              <tr key={id}>
                <td className="align-middle">{word.word}</td>
                <td
                  className="align-middle"
                  onClick={() => {
                    if (isAuthenticated && !doneCurrent) {
                      let temp = solutionLabel;
                      let tempDetail = solutionDetailsLabel;
                      if (parseInt(temp[id]) === 0) {
                        temp[id] = 1 + "";
                        let arr = scores;
                        arr[id] = 2;
                        setScores(arr);
                      } else {
                        temp[id] = 0 + "";
                        let arr = scores;
                        arr[id] = 0;
                        setScores(arr);
                      }
                      tempDetail[id] = 0 + "";
                      setSolutionLabel(temp);
                      setSolutionDetailsLabel(tempDetail);

                      forceUpdate();
                    }
                  }}
                >
                  <span
                    className={`${
                      parseInt(solutionLabel[id]) === 1
                        ? "self-correct"
                        : "time-out"
                    } px-1   d-inline-flex align-items-center justify-content-center`}
                  >
                    {word.solution}
                  </span>
                </td>
                <td className="align-middle">
                  {word.solutionDetails.map((w, i) => {
                    return (
                      <span
                        key={parseInt(id + "" + i)}
                        onClick={() => {
                          if (isAuthenticated && !doneCurrent) {
                            let temp = solutionLabel;
                            let tempDetail = solutionDetailsLabel;

                            if (parseInt(tempDetail[id]) === i + 1) {
                              tempDetail[id] = 0 + "";
                              let arr = scores;
                              arr[id] = 0;
                              setScores(arr);
                            } else {
                              tempDetail[id] = i + 1 + "";
                              let arr = scores;
                              arr[id] = 1;
                              setScores(arr);
                            }
                            temp[id] = 0 + "";

                            setSolutionLabel(temp);
                            setSolutionDetailsLabel(tempDetail);
                            forceUpdate();
                          }
                        }}
                      >
                        <span
                          className={`${
                            parseInt(solutionDetailsLabel[id]) === i + 1
                              ? "self-correct"
                              : "time-out"
                          } px-1   d-inline-flex align-items-center justify-content-center`}
                        >
                          {w}
                        </span>
                      </span>
                    );
                  })}
                </td>
                <td className="align-middle">
                  <span
                    onClick={() => {
                      if (isAuthenticated && !doneCurrent) {
                        let temp = solutionLabel;
                        let tempDetail = solutionDetailsLabel;
                        temp[id] = 0 + "";
                        tempDetail[id] = 0 + "";
                        setSolutionLabel(temp);
                        setSolutionDetailsLabel(tempDetail);
                        let arr = scores;
                        arr[id] = 0;
                        setScores(arr);

                        forceUpdate();
                      }
                    }}
                  >
                    <span
                      className={`${
                        parseInt(solutionLabel[id]) === 0 &&
                        parseInt(solutionDetailsLabel[id]) === 0 &&
                        scores[id] !== undefined
                          ? "incorrect"
                          : "time-out"
                      } px-1   d-inline-flex align-items-center justify-content-center`}
                    >
                      0
                    </span>
                  </span>
                </td>
                {isAuthenticated && (
                  <td className="align-middle">
                    <input
                      type="number"
                      max={2}
                      min={0}
                      readOnly={location.pathname.includes(
                        "/assessment/preview/"
                      )}
                      onChange={(e) => {
                        let arr = scores;
                        arr[id] = parseInt(e.target.value);
                        setScores(arr);
                        console.log(scores);
                        forceUpdate();
                      }}
                      value={scores[id] === undefined ? "" : scores[id]}
                      className="form-control form-silly mr-2 d-inline px-0 text-center "
                    />
                    &nbsp;&nbsp;/&nbsp;2
                  </td>
                )}
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isAuthenticated && (
        <Fragment>
          <div class="form-floating my-2">
            <textarea
              onChange={(e) => SetComment(e.target.value)}
              class="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              readOnly={location.pathname.includes("/assessment/preview/")}
              value={comment}
              style={{ height: "100px" }}
            ></textarea>
            <label for="floatingTextarea2">Comments</label>
          </div>
          <div
            className={`d-flex align-items-center justify-content-${
              !doneCurrent ? "end" : "between"
            } my-3`}
          >
            {doneCurrent && (
              <>
                <div className="">
                  <div className="">
                    #&nbsp;&nbsp;Correct{" "}
                    {scores.reduce((a, b) => {
                      if (a === "") {
                        return b;
                      } else if (b === "") {
                        return a;
                      } else {
                        return a + b;
                      }
                    })}
                    {/*{' '}
                    &nbsp;/&nbsp; {assessment.Body.split(',').length * 2}*/}
                  </div>
                </div>
              </>
            )}
            {!location.pathname.includes("/assessment/preview/") && (
              <div className="d-flex align-items-center justify-content-end mb-2  p-2">
                <button
                  type="reset"
                  className="button-primary btn-block btn px-5 mx-2"
                  onClick={() => {
                    setScores([]);
                    setDone(false);
                    setDoneCurrent(false);
                    setSolutionDetailsLabel(zeros(assessment.Body.split(",")));
                    setSolutionLabel(zeros(assessment.Body.split(",")));
                    forceUpdate();
                  }}
                >
                  Clear
                </button>

                {!doneCurrent ? (
                  <div
                    className="button-primary btn-block btn px-5"
                    onClick={() => {
                      setRestartKey(restartKey + 1);
                      setPlay(false);
                      setDone(true);
                      setDoneCurrent(true);
                      forceUpdate();
                    }}
                  >
                    Done
                  </div>
                ) : (
                  <button
                    className="button-primary btn-block btn px-5"
                    type="submit"
                  >
                    Submit
                  </button>
                )}

                {/* Delete Button */}
                {/* Delete Modal */}
                <div
                  className="modal fade"
                  id="deleteResult"
                  aria-labelledby="deleteResultLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="deleteResultLabel">
                          Delete Assigned Assessment
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        Are you sure you want to delete assigned assessment?
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn button-primary"
                          onClick={() => {
                            deleteResult(
                              assessmentResults.ResultID,
                              user.SchoolID
                            );
                            hist.push("/admin/result");
                            clearResult();
                          }}
                          data-bs-dismiss="modal"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="btn btn-danger d-flex align-items-center px-4 mx-2"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteResult"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill button-child"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                  Delete
                </div>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </form>
  );
};

export default AssessmentFirstSound;
