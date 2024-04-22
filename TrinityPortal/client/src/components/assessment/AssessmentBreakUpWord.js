import React, { useState, Fragment } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { useHistory, useLocation } from "react-router-dom";

const AssessmentBreakUpWord = ({
  assessment,
  forceUpdate,
  done,
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
    const Scores = data.Scores.split(",");

    let arr = [];
    for (let i = 0; i < Body.length; i++) {
      arr.push({
        word: Body[i],
        solution: Solution[i],
        scores: Scores[i],
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

  const sum = (id) => {
    let sum = 0;
    const arr = soundsLength;
    for (let i = 0; i < id; i++) {
      sum += parseInt(arr[i]);
    }
    return sum;
  };

  const combine = (id, forward, i) => {
    let temp = sounds;
    let templabel = soundsLabel;
    let tempLength = soundsLength;
    if (forward) {
      console.log(1);
      temp[id] = temp[id] + temp[id + 1];
      temp.splice(id + 1, 1);
      templabel.splice(id + 1, 1);
    } else {
      temp[id] = temp[id - 1] + temp[id];
      temp.splice(id - 1, 1);
      templabel.splice(id - 1, 1);
    }
    tempLength[i] = parseInt(tempLength[i]) - 1 + "";
    setSoundsLength(tempLength);
    setSoundsLabel(templabel);
    setSounds(temp);
    forceUpdate();
  };

  const separate = (arr, ind, i) => {
    let temp = sounds;
    let templabel = soundsLabel;
    let tempLength = soundsLength;
    temp[ind] = "/" + arr[0] + "/";
    for (let i = 1; i < arr.length; i++) {
      temp.splice(ind + i, 0, "/" + arr[i] + "/");
      templabel.splice(ind + i, 0, templabel[ind]);
    }
    tempLength[i] = parseInt(tempLength[i]) + arr.length - 1 + "";
    setSoundsLength(tempLength);
    setSoundsLabel(templabel);
    setSounds(temp);
    forceUpdate();
  };

  const [soundsLabel, setSoundsLabel] = useState(
    assessmentResults.SoundsIndex !== null
      ? assessmentResults.SoundsIndex.split(",")
      : zeros(assessment.Solution.split(",").join(" ").split(" "))
  );
  const [sounds, setSounds] = useState(
    assessmentResults.Sounds !== null
      ? assessmentResults.Sounds.split(",")
      : assessment.Solution.split(",").join(" ").split(" ")
  );
  const [soundsLength, setSoundsLength] = useState(
    assessmentResults.SoundsLength !== null
      ? assessmentResults.SoundsLength.split(",")
      : assessment.Scores.split(",")
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
          assessment.Scores.split(",").reduce(
            (a, b) => parseInt(a) + parseInt(b),
            0
          )) *
          100
      ),
      Scores: scores.join(","),
      CategoryID: assessment.CategoryID,
      Comment: comment,
      Year: assessmentResults.year,
      Sounds: sounds,
      SoundsIndex: soundsLabel,
      SoundsLength: soundsLength,
    };
    console.log(data);
    updateAssessmentResult(data).then(() => {
      hist.push(`/admin/result`);
    });
  };
  return (
    <form className="w-80 mx-auto" onSubmit={(e) => onSubmit(e)}>
      <table className=" table bg-light">
        <thead>
          <tr>
            <th>Teachers Says</th>
            <th>Solution</th>
            {isAuthenticated && <th>Students Says</th>}
            {isAuthenticated && <th>Number Correct</th>}
          </tr>
        </thead>
        <tbody>
          {format(assessment).map((word, i) => {
            return (
              <tr key={i}>
                <td className="align-middle">{word.word}</td>
                <td className="align-middle">{word.solution}</td>
                <td className="align-middle">
                  {sounds
                    .slice(sum(i), sum(i) + parseInt(soundsLength[i]))
                    .map((sound, id) => (
                      <span
                        key={parseInt(i + "" + id)}
                        className="position-relative"
                      >
                        <ContextMenuTrigger
                          id={"same_unique_identifier" + parseInt(i + "" + id)}
                        >
                          <span
                            className="mx-1"
                            onClick={() => {
                              if (isAuthenticated && !doneCurrent) {
                                const ind = sum(i) + id;
                                const timeout = soundsLabel.indexOf("4");
                                if (ind <= timeout || timeout === -1) {
                                  let temp = soundsLabel;
                                  if (parseInt(soundsLabel[ind]) === 0) {
                                    temp[ind] = 1 + "";
                                  } else if (parseInt(soundsLabel[ind]) === 1) {
                                    temp[ind] = 2 + "";
                                  } else if (parseInt(soundsLabel[ind]) === 2) {
                                    temp[ind] = 3 + "";
                                  } else if (parseInt(soundsLabel[ind]) === 3) {
                                    for (let i = 0; i < temp.length; i++) {
                                      if (temp[i] === 4) {
                                        temp[i] = 0 + "";
                                      }
                                    }
                                    temp[ind] = 4 + "";
                                  } else {
                                    temp[ind] = 0 + "";
                                  }
                                  setSoundsLabel(temp);
                                  let score = 0;
                                  for (
                                    let j = sum(i);
                                    j < sum(i) + parseInt(soundsLength[i]);
                                    j++
                                  ) {
                                    if (
                                      parseInt(temp[j]) === 1 ||
                                      parseInt(temp[j]) === 3
                                    ) {
                                      score++;
                                    }
                                  }

                                  let arr = scores;
                                  arr[i] = score;
                                  setScores(arr);
                                  console.log(score);
                                  forceUpdate();
                                }
                              }
                            }}
                          >
                            {parseInt(soundsLabel[sum(i) + id]) === 0 && (
                              <span className="time-out px-1   d-inline-flex align-items-center justify-content-center">
                                {sound}
                              </span>
                            )}
                            {parseInt(soundsLabel[sum(i) + id]) === 1 && (
                              <span className="self-correct px-1 txt-primary d-inline-flex align-items-center justify-content-center">
                                {sound}
                              </span>
                            )}
                            {parseInt(soundsLabel[sum(i) + id]) === 2 && (
                              <span className="incorrect px-1  d-inline-flex align-items-center justify-content-center">
                                {sound}
                              </span>
                            )}
                            {parseInt(soundsLabel[sum(i) + id]) === 3 && (
                              <span className="position-relative">
                                <div
                                  style={{
                                    position: "absolute",
                                    display: "inline-block",
                                    top: "-150%",
                                    left: "0",
                                  }}
                                  className=" w-100 text-center"
                                >
                                  <span className=" txt-primary d-inline-flex align-items-center justify-content-center">
                                    SC
                                  </span>
                                </div>
                                <span className="self-correct px-1 txt-primary d-inline-flex align-items-center justify-content-center">
                                  {sound}
                                </span>
                              </span>
                            )}
                            {parseInt(soundsLabel[sum(i) + id]) === 4 && (
                              <span>
                                <b style={{ color: "#FAA525" }}>]</b>
                                <span className="time-out px-1   d-inline-flex align-items-center justify-content-center">
                                  {sound}
                                </span>
                              </span>
                            )}
                          </span>
                        </ContextMenuTrigger>
                        {isAuthenticated && !doneCurrent && (
                          <ContextMenu
                            id={
                              "same_unique_identifier" + parseInt(i + "" + id)
                            }
                            className="card react-contextmenu p-1"
                          >
                            <MenuItem
                              onClick={() => {
                                const ind = sum(i) + id;
                                const timeout = soundsLabel.indexOf("4");
                                if (ind <= timeout || timeout === -1) {
                                  if (parseInt(soundsLength[i]) > 1) {
                                    if (id < parseInt(soundsLength[i]) - 1) {
                                      combine(ind, true, i);
                                    } else {
                                      combine(ind, false, i);
                                    }
                                    let temp = soundsLabel;
                                    let score = 0;
                                    for (
                                      let j = sum(i);
                                      j < sum(i) + parseInt(soundsLength[i]);
                                      j++
                                    ) {
                                      if (
                                        parseInt(temp[j]) === 1 ||
                                        parseInt(temp[j]) === 3
                                      ) {
                                        score++;
                                      }
                                    }
                                    let arr = scores;
                                    arr[i] = score;
                                    setScores(arr);
                                    console.log(score);
                                    forceUpdate();
                                  }
                                }
                              }}
                              className="p-2 btn react-contextmenu-item d-flex align-items-center justify-content-start"
                            >
                              <span className="time-out px-1   d-inline-flex align-items-center justify-content-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="#18a587"
                                  class="bi bi-plus-lg"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                                  />
                                </svg>
                              </span>
                              <span>
                                <b>Combine</b>
                              </span>
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                const ind = sum(i) + id;
                                const timeout = soundsLabel.indexOf("4");
                                if (ind <= timeout || timeout === -1) {
                                  const arr = sounds[ind]
                                    .substring(1, sounds[ind].length - 1)
                                    .split("//");
                                  if (arr.length > 1) {
                                    separate(arr, ind, i);
                                    let temp = soundsLabel;
                                    let score = 0;

                                    for (
                                      let j = sum(i);
                                      j < sum(i) + parseInt(soundsLength[i]);
                                      j++
                                    ) {
                                      if (
                                        parseInt(temp[j]) === 1 ||
                                        parseInt(temp[j]) === 3
                                      ) {
                                        score++;
                                      }
                                    }
                                    let r = scores;
                                    r[i] = score;
                                    setScores(r);
                                    console.log(score);
                                    forceUpdate();
                                  }
                                }
                              }}
                              className="p-2 btn react-contextmenu-item d-flex align-items-center justify-content-start"
                            >
                              <span className="time-out px-1   d-inline-flex align-items-center justify-content-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="red"
                                  class="bi bi-dash-lg"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
                                  />
                                </svg>
                              </span>
                              <span>
                                <b>Separate</b>
                              </span>
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                const ind = sum(i) + id;
                                const timeout = soundsLabel.indexOf("4");
                                if (ind <= timeout || timeout === -1) {
                                  let temp = soundsLabel;
                                  temp[ind] = 1 + "";
                                  console.log(temp[ind]);
                                  setSoundsLabel(temp);
                                  let score = 0;
                                  for (
                                    let j = sum(i);
                                    j < sum(i) + parseInt(soundsLength[i]);
                                    j++
                                  ) {
                                    if (
                                      parseInt(temp[j]) === 1 ||
                                      parseInt(temp[j]) === 3
                                    ) {
                                      score++;
                                    }
                                  }

                                  let arr = scores;
                                  arr[i] = score;
                                  setScores(arr);
                                  console.log(score);
                                  forceUpdate();
                                }
                              }}
                              className="p-2 btn react-contextmenu-item d-flex align-items-center justify-content-start"
                            >
                              <span className="self-correct px-1   d-inline-flex align-items-center justify-content-center"></span>
                              <span>
                                <b>Correct</b>
                              </span>
                            </MenuItem>

                            <MenuItem
                              onClick={() => {
                                const ind = sum(i) + id;
                                const timeout = soundsLabel.indexOf("4");
                                if (ind <= timeout || timeout === -1) {
                                  let temp = soundsLabel;
                                  temp[ind] = 2 + "";
                                  setSoundsLabel(temp);
                                  let score = 0;
                                  for (
                                    let j = sum(i);
                                    j < sum(i) + parseInt(soundsLength[i]);
                                    j++
                                  ) {
                                    if (
                                      parseInt(temp[j]) === 1 ||
                                      parseInt(temp[j]) === 3
                                    ) {
                                      score++;
                                    }
                                  }

                                  let arr = scores;
                                  arr[i] = score;
                                  setScores(arr);
                                  console.log(score);
                                  forceUpdate();
                                }
                              }}
                              className="p-2 btn react-contextmenu-item d-flex align-items-center justify-content-start"
                            >
                              <span className="incorrect px-1 d-flex align-items-center justify-content-center">
                                /
                              </span>
                              <span>
                                <b>Incorrect response</b>
                              </span>
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                const ind = sum(i) + id;
                                const timeout = soundsLabel.indexOf("4");
                                if (ind <= timeout || timeout === -1) {
                                  let temp = soundsLabel;
                                  temp[ind] = 3 + "";
                                  setSoundsLabel(temp);
                                  let score = 0;
                                  for (
                                    let j = sum(i);
                                    j < sum(i) + parseInt(soundsLength[i]);
                                    j++
                                  ) {
                                    if (
                                      parseInt(temp[j]) === 1 ||
                                      parseInt(temp[j]) === 3
                                    ) {
                                      score++;
                                    }
                                  }

                                  let arr = scores;
                                  arr[i] = score;
                                  setScores(arr);
                                  console.log(score);
                                  forceUpdate();
                                }
                              }}
                              className="p-2 btn react-contextmenu-item d-flex align-items-center justify-content-start"
                            >
                              <span className="self-correct px-1 txt-primary d-inline-flex align-items-center justify-content-center">
                                SC
                              </span>
                              <span>
                                <b>Self Correction</b>
                              </span>
                            </MenuItem>

                            <MenuItem
                              onClick={() => {
                                const ind = sum(i) + id;
                                const timeout = soundsLabel.indexOf("4");
                                if (ind <= timeout || timeout === -1) {
                                  let temp = soundsLabel;
                                  for (let i = 0; i < temp.length; i++) {
                                    if (parseInt(temp[i]) === 4) {
                                      temp[i] = 0 + "";
                                    }
                                  }
                                  temp[ind] = 4 + "";
                                  setSoundsLabel(temp);
                                  let score = 0;
                                  for (
                                    let j = sum(i);
                                    j < sum(i) + parseInt(soundsLength[i]);
                                    j++
                                  ) {
                                    if (
                                      parseInt(temp[j]) === 1 ||
                                      parseInt(temp[j]) === 3
                                    ) {
                                      score++;
                                    }
                                  }

                                  let arr = scores;
                                  arr[i] = score;
                                  setScores(arr);
                                  console.log(score);
                                  forceUpdate();
                                }
                              }}
                              className="p-2 btn react-contextmenu-item d-flex align-items-center justify-content-start"
                            >
                              <span
                                style={{ color: "#FAA525" }}
                                className="time-out px-1   d-inline-flex align-items-center justify-content-center"
                              >
                                <b> ]</b>
                              </span>
                              <span>
                                <b>Time out</b>
                              </span>
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                const ind = sum(i) + id;
                                const timeout = soundsLabel.indexOf("4");
                                if (ind <= timeout || timeout === -1) {
                                  let temp = soundsLabel;
                                  temp[ind] = 0 + "";
                                  setSoundsLabel(temp);
                                  let score = 0;
                                  for (
                                    let j = sum(i);
                                    j < sum(i) + parseInt(soundsLength[i]);
                                    j++
                                  ) {
                                    if (
                                      parseInt(temp[j]) === 1 ||
                                      parseInt(temp[j]) === 3
                                    ) {
                                      score++;
                                    }
                                  }

                                  let arr = scores;
                                  arr[i] = score;
                                  setScores(arr);
                                  console.log(score);
                                  forceUpdate();
                                }
                              }}
                              className="p-2 btn react-contextmenu-item d-flex align-items-center justify-content-start"
                            >
                              <span className="time-out px-1   d-inline-flex align-items-center justify-content-center"></span>
                              <span>
                                <b>No Response</b>
                              </span>
                            </MenuItem>
                          </ContextMenu>
                        )}
                      </span>
                    ))}
                </td>
                {isAuthenticated && (
                  <td className="align-middle">
                    <input
                      type="number"
                      required
                      readOnly={location.pathname.includes(
                        "/assessment/preview/"
                      )}
                      min={0}
                      max={word.scores}
                      onChange={(e) => {
                        let arr = scores;
                        arr[i] = parseInt(e.target.value);
                        setScores(arr);
                        console.log(scores);
                        forceUpdate();
                      }}
                      value={scores[i] === undefined ? 0 : scores[i]}
                      className="form-control form-silly mr-2 d-inline px-0 text-center "
                    />
                    &nbsp;&nbsp;/&nbsp;{word.scores}
                  </td>
                )}
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
              value={comment}
              readOnly={location.pathname.includes("/assessment/preview/")}
              id="floatingTextarea2"
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
              <div className="">
                # Correct{" "}
                {Math.round(
                  scores.reduce((a, b) => {
                    if (a === "") {
                      return b;
                    } else if (b === "") {
                      return a;
                    } else {
                      return a + b;
                    }
                  }, 0)
                )}{" "}
              </div>
            )}
            {!location.pathname.includes("/assessment/preview/") && (
              <div className="d-flex align-items-center justify-content-end mb-2  p-2">
                <button
                  type="reset"
                  className="button-primary btn-block btn px-5 mx-2"
                  onClick={() => {
                    setScores([]);
                    forceUpdate();
                    setDoneCurrent(false);
                    setDone(false);
                    setSounds(
                      assessment.Solution.split(",").join(" ").split(" ")
                    );
                    setSoundsLabel(
                      zeros(assessment.Solution.split(",").join(" ").split(" "))
                    );
                    setSoundsLength(assessment.Scores.split(","));
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
                            deleteResult(assessmentResults.ResultID, user.SchoolID);
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

export default AssessmentBreakUpWord;
