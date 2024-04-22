import React, { useState, Fragment, useEffect } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { useHistory, useLocation } from "react-router-dom";

const AssessmentSilly = ({
  assessment,
  forceUpdate,
  setRestartKey,
  restartKey,
  setDone,
  setPlay,
  isAuthenticated,
  updateAssessmentResult,
  assessmentResults,
  deleteResult,
  clearResult,
  user,
}) => {
  const hist = useHistory();
  const location = useLocation();

  const format = (data) => {
    let arr = [];

    for (let i = 0; i < data.Body.split(",").length / data.Groups; i++) {
      arr.push(i * data.Groups);
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

  const countRow = (id) => {
    if (id === 0) return 0;
    return soundsLength
      .slice(0, id * assessment.Groups)
      .reduce((a, b) => parseInt(a) + parseInt(b), 0);
  };

  const combine = (id, forward, i) => {
    let temp = sounds;
    let templabel = soundsLabel;
    let tempLength = soundsLength;
    if (forward) {
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
    temp[ind] = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (parseInt(templabel[ind]) === 4) {
        temp.splice(ind + i, 0, arr[i]);
        templabel.splice(ind + i, 0, 0);
      } else {
        temp.splice(ind + i, 0, arr[i]);
        templabel.splice(ind + i, 0, templabel[ind]);
      }
    }
    tempLength[i] = parseInt(tempLength[i]) + arr.length - 1 + "";
    setSoundsLength(tempLength);
    setSoundsLabel(templabel);
    setSounds(temp);
    forceUpdate();
  };

  const [sounds, setSounds] = useState(
    assessmentResults.Sounds !== null
      ? assessmentResults.Sounds.split(",")
      : assessment.Body.split(",")
  );

  const [soundsLength, setSoundsLength] = useState(
    assessmentResults.SoundsLength !== null
      ? assessmentResults.SoundsLength.split(",")
      : () => {
          let arr = [];
          const body = assessment.Body.split(",");
          for (let i = 0; i < body.length; i++) {
            arr.push(1);
          }
          return arr;
        }
  );

  const [soundsLabel, setSoundsLabel] = useState(
    assessmentResults.SoundsIndex !== null
      ? assessmentResults.SoundsIndex.split(",")
      : zeros(assessment.Body.split(","))
  );

  const [cls, setCLS] = useState(
    assessmentResults.CLS !== null
      ? () => {
          assessmentResults.CLS.split(",");
          let temp = [];
          for (let i = 0; i < assessmentResults.CLS.split(",").length; i++) {
            temp[i] = parseInt(assessmentResults.CLS.split(",")[i]);
          }
          return temp;
        }
      : []
  );
  const [wwr, setWWR] = useState(
    assessmentResults.WWR !== null
      ? () => {
          assessmentResults.WWR.split(",");
          let temp = [];
          for (let i = 0; i < assessmentResults.WWR.split(",").length; i++) {
            temp[i] = parseInt(assessmentResults.WWR.split(",")[i]);
          }
          return temp;
        }
      : []
  );

  const [values, setValues] = useState({
    totalCLS:
      assessmentResults.TotalCLS !== null ? assessmentResults.TotalCLS : 0,
    totalWWR:
      assessmentResults.TotalWWR !== null ? assessmentResults.TotalWWR : 0,
  });
  const [comment, SetComment] = useState(
    assessmentResults.Comment !== null ? assessmentResults.Comment : ""
  );

  const [doneCurrent, setDoneCurrent] = useState(
    location.pathname.includes("/assessment/preview/")
  );

  const [totalScore, setTotalScore] = useState(
    assessmentResults.TotalScore !== null ? assessmentResults.TotalScore : 0
  );

  const calculate = () => {
    setValues({
      totalCLS: cls.reduce((a, b) => {
        if (a === "") {
          return b;
        } else if (b === "") {
          return a;
        } else {
          return a + b;
        }
      }, 0),
      totalWWR: wwr.reduce((a, b) => {
        if (a === "") {
          return b;
        } else if (b === "") {
          return a;
        } else {
          return a + b;
        }
      }, 0),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const totalScoreCLS = Math.round(
      (values.totalCLS / assessment.Body.split(",").join("").length) * 100
    );
    const totalScoreWWR = Math.round(
      (values.totalWWR / assessment.Body.split(",").length) * 100
    );
    console.log(
      parseInt(totalScoreCLS + "" + ("00" + totalScoreWWR).slice(-3))
    );
    /*setTotalScore(
      parseInt(totalScoreCLS + '' + ('00' + totalScoreWWR).slice(-3)),
    );*/
    let data = {
      ...assessmentResults,
      CLS: cls.join(","),
      WWR: wwr.join(","),
      TotalCLS: values.totalCLS,
      TotalWWR: values.totalWWR,
      CategoryID: assessment.CategoryID,
      Comment: comment,
      TotalScore: parseInt(
        totalScoreCLS + "" + ("00" + totalScoreWWR).slice(-3)
      ),
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

  useEffect(() => {
    if (
      doneCurrent &&
      !location.pathname.includes("preview") &&
      values.totalCLS === 0
    ) {
      calculate();
    }
    /*if (values.totalCLS !== 0 && totalScore === 0) {
      console.log(values);
      console.log(assessment.Body.split(',').join('').length, 1);
      const totalScoreCLS = Math.round(
        (values.totalCLS / assessment.Body.split(',').join('').length) * 100,
      );
      const totalScoreWWR = Math.round(
        (values.totalWWR / assessment.Body.split(',').length) * 100,
      );

      console.log(values);

      setRestartKey(restartKey + 1);
      setPlay(false);
      setDone(true);
      forceUpdate();
    }*/
  }, [doneCurrent, values, totalScore, calculate, setTotalScore, forceUpdate]);

  return (
    <form className="w-80 mx-auto" onSubmit={(e) => onSubmit(e)}>
      <table className=" table bg-light">
        {isAuthenticated && (
          <thead>
            <tr>
              {format(assessment).map((item, id) => {
                if (id < assessment.Groups) {
                  return <th></th>;
                }
              })}
              <th>CLS</th>
              <th>WWR</th>
            </tr>
          </thead>
        )}
        <tbody className="w-100">
          {format(assessment).map((item, id) => {
            return (
              <tr key={id} className="w-100">
                {soundsLength.map((length, ind) => {
                  if (ind >= item && ind < (id + 1) * assessment.Groups)
                    return (
                      <td key={ind} className="text-center align-middle">
                        {sounds
                          .slice(sum(ind), sum(ind) + parseInt(length))
                          .map((letter, i) => (
                            <span key={parseInt(ind + "" + i)}>
                              <ContextMenuTrigger
                                id={
                                  "same_unique_identifier" +
                                  parseInt(ind + "" + i)
                                }
                              >
                                <span
                                  onClick={() => {
                                    if (isAuthenticated && !doneCurrent) {
                                      const index = sum(ind) + i;
                                      const timeout = soundsLabel.indexOf("4");
                                      if (index <= timeout || timeout === -1) {
                                        let temp = soundsLabel;
                                        if (
                                          parseInt(soundsLabel[index]) === 0
                                        ) {
                                          temp[index] = 1 + "";
                                          if (
                                            parseInt(soundsLength[ind]) === 1
                                          ) {
                                            let w = wwr;
                                            w[id] =
                                              w[id] === undefined
                                                ? 1
                                                : parseInt(w[id]) + 1;
                                            setWWR(w);
                                          }
                                        } else if (
                                          parseInt(soundsLabel[index]) === 1
                                        ) {
                                          temp[index] = 2 + "";
                                          if (
                                            parseInt(soundsLength[ind]) === 1
                                          ) {
                                            let w = wwr;
                                            w[id] = parseInt(w[id]) - 1;
                                            setWWR(w);
                                          }
                                        } else if (
                                          parseInt(soundsLabel[index]) === 2
                                        ) {
                                          temp[index] = 3 + "";
                                          if (
                                            parseInt(soundsLength[ind]) === 1
                                          ) {
                                            let w = wwr;
                                            w[id] =
                                              w[id] === undefined
                                                ? 1
                                                : parseInt(w[id]) + 1;
                                            setWWR(w);
                                          }
                                        } else if (
                                          parseInt(soundsLabel[index]) === 3
                                        ) {
                                          for (
                                            let i = 0;
                                            i < temp.length;
                                            i++
                                          ) {
                                            if (parseInt(temp[i]) === 4) {
                                              temp[i] = 0 + "";
                                            }
                                          }
                                          temp[index] = 4 + "";
                                          if (
                                            parseInt(soundsLength[ind]) === 1
                                          ) {
                                            let w = wwr;
                                            w[id] = parseInt(w[id]) - 1;
                                            setWWR(w);
                                          }
                                        } else {
                                          temp[index] = 0 + "";
                                        }
                                        setSoundsLabel(temp);

                                        let score = 0;
                                        for (
                                          let j = countRow(id);
                                          j < countRow(id + 1);
                                          j++
                                        ) {
                                          if (
                                            parseInt(temp[j]) === 1 ||
                                            parseInt(temp[j]) === 3
                                          ) {
                                            score += sounds[j].length;
                                          }
                                        }

                                        let arr = cls;
                                        arr[id] = score;
                                        setCLS(arr);

                                        forceUpdate();
                                      }
                                    }
                                  }}
                                  className="time-out px-1   d-inline-flex align-items-center justify-content-center"
                                >
                                  {parseInt(soundsLabel[sum(ind) + i]) ===
                                    4 && (
                                    <span>
                                      <b style={{ color: "#FAA525" }}>]</b>
                                      <span className="time-out px-1   d-inline-flex align-items-center justify-content-center">
                                        {letter}
                                      </span>
                                    </span>
                                  )}
                                  {parseInt(soundsLabel[sum(ind) + i]) ===
                                    0 && (
                                    <span className="time-out px-1   d-inline-flex align-items-center justify-content-center">
                                      {letter}
                                    </span>
                                  )}
                                  {parseInt(soundsLabel[sum(ind) + i]) ===
                                    3 && (
                                    <span className="position-relative">
                                      <div
                                        style={{
                                          position: "absolute",
                                          display: "inline-block",
                                          top: "-80%",
                                          left: "0",
                                        }}
                                        className=" w-100 text-center"
                                      >
                                        <span className=" txt-primary d-inline-flex align-items-center justify-content-center">
                                          SC
                                        </span>
                                      </div>
                                      <span className="self-correct px-1 txt-primary d-inline-flex align-items-center justify-content-center">
                                        {letter}
                                      </span>
                                    </span>
                                  )}
                                  {parseInt(soundsLabel[sum(ind) + i]) ===
                                    1 && (
                                    <span className="self-correct px-1 txt-primary d-inline-flex align-items-center justify-content-center">
                                      {letter}
                                    </span>
                                  )}
                                  {parseInt(soundsLabel[sum(ind) + i]) ===
                                    2 && (
                                    <span className="incorrect px-1  d-inline-flex align-items-center justify-content-center">
                                      {letter}
                                    </span>
                                  )}
                                </span>{" "}
                              </ContextMenuTrigger>
                              {isAuthenticated && !doneCurrent && (
                                <ContextMenu
                                  id={
                                    "same_unique_identifier" +
                                    parseInt(ind + "" + i)
                                  }
                                  className="card react-contextmenu p-1"
                                >
                                  <MenuItem
                                    onClick={() => {
                                      const index = sum(ind) + i;
                                      const timeout = soundsLabel.indexOf("4");
                                      if (index <= timeout || timeout === -1) {
                                        if (parseInt(soundsLength[ind]) > 1) {
                                          if (
                                            i <
                                            parseInt(soundsLength[ind]) - 1
                                          ) {
                                            combine(index, true, ind);
                                          } else {
                                            combine(index, false, ind);
                                          }
                                          let temp = soundsLabel;
                                          let score = 0;
                                          for (
                                            let j = countRow(id);
                                            j < countRow(id + 1);
                                            j++
                                          ) {
                                            if (
                                              parseInt(temp[j]) === 1 ||
                                              parseInt(temp[j]) === 3
                                            ) {
                                              score += sounds[j].length;
                                            }
                                          }
                                          console.log(
                                            soundsLength[ind],
                                            temp[index]
                                          );
                                          if (
                                            parseInt(soundsLength[ind]) === 1 &&
                                            (parseInt(temp[index]) === 1 ||
                                              parseInt(temp[index]) === 3)
                                          ) {
                                            console.log(true);
                                            let w = wwr;
                                            w[id] =
                                              w[id] === undefined
                                                ? 1
                                                : parseInt(w[id]) + 1;
                                            setWWR(w);
                                          }
                                          let arr = cls;
                                          arr[id] = score;
                                          setCLS(arr);

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
                                    <span className="px-3">
                                      <b>Combine</b>
                                    </span>
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      const index = sum(ind) + i;
                                      const arr = sounds[index].split("");
                                      let temp = soundsLabel;
                                      const timeout = soundsLabel.indexOf("4");
                                      if (index <= timeout || timeout === -1) {
                                        if (
                                          parseInt(soundsLength[ind]) === 1 &&
                                          (parseInt(temp[index]) === 1 ||
                                            parseInt(temp[index]) === 3)
                                        ) {
                                          console.log(true);
                                          let w = wwr;
                                          w[id] = parseInt(w[id]) - 1;
                                          setWWR(w);
                                        }
                                        if (arr.length > 1) {
                                          separate(arr, index, ind);

                                          let score = 0;

                                          for (
                                            let j = countRow(id);
                                            j < countRow(id + 1);
                                            j++
                                          ) {
                                            if (
                                              parseInt(temp[j]) === 1 ||
                                              parseInt(temp[j]) === 3
                                            ) {
                                              score += sounds[j].length;
                                            }
                                          }
                                          let r = cls;
                                          r[id] = score;
                                          setCLS(r);

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
                                    <span className="px-3">
                                      <b>Separate</b>
                                    </span>
                                  </MenuItem>
                                </ContextMenu>
                              )}
                            </span>
                          ))}
                      </td>
                    );
                })}
                {isAuthenticated && (
                  <td className="align-middle">
                    <input
                      type="number"
                      required
                      readOnly={true}
                      onChange={(e) => {
                        let arr = cls;
                        arr[id] = parseInt(e.target.value);
                        setCLS(arr);
                        console.log(cls);
                        forceUpdate();
                      }}
                      value={cls[id] === undefined ? 0 : cls[id]}
                      className="form-control form-silly mr-2 d-inline px-0 text-center "
                    />
                    &nbsp;&nbsp;/&nbsp;
                    {
                      assessment.Body.split(",")
                        .slice(item, (id + 1) * assessment.Groups)
                        .join("").length
                    }
                  </td>
                )}

                {isAuthenticated && (
                  <td className="align-middle">
                    <input
                      type="number"
                      required
                      readOnly={true}
                      onChange={(e) => {
                        let arr = wwr;
                        arr[id] = parseInt(e.target.value);
                        setWWR(arr);
                        console.log(wwr);
                        forceUpdate();
                      }}
                      value={wwr[id] === undefined ? 0 : wwr[id]}
                      className="form-control form-silly mr-2 d-inline px-0 text-center"
                    />
                    &nbsp;&nbsp;/&nbsp;{" "}
                    {
                      assessment.Body.split(",").slice(
                        item,
                        (id + 1) * assessment.Groups
                      ).length
                    }
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
                Total Correct Letter Sounds (CLS):{" "}
                <span className="txt-primary">
                  <b>{values.totalCLS}</b>
                </span>{" "}
                <br />
                Total Whole Word Read (WWR):{" "}
                <span className="txt-primary">
                  <b>{values.totalWWR}</b>
                </span>
                {/*<br />
                Total Score:{' '}
                <span className='txt-primary'>
                  <b>{totalScore}</b>
                </span>*/}
              </div>
            )}
            {!location.pathname.includes("/assessment/preview/") && (
              <div className="d-flex align-items-center justify-content-end mb-2  p-2">
                <button
                  className="button-primary btn-block btn px-5 mx-2"
                  type="reset"
                  onClick={() => {
                    setValues({
                      totalCLS: 0,
                      totalWWR: 0,
                    });
                    setCLS([]);
                    setWWR([]);
                    forceUpdate();
                    setDone(false);
                    setDoneCurrent(false);
                    setSounds(assessment.Body.split(",").join("").split(""));
                    setSoundsLabel(
                      zeros(assessment.Body.split(",").join("").split(""))
                    );
                    setSoundsLength(() => {
                      let arr = [];
                      const body = assessment.Body.split(",");
                      for (let i = 0; i < body.length; i++) {
                        arr.push(body[i].length);
                      }
                      return arr;
                    });
                  }}
                >
                  Clear
                </button>
                {!doneCurrent ? (
                  <div
                    className="button-primary btn-block btn px-5"
                    onClick={(e) => {
                      setDoneCurrent(true);
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

export default AssessmentSilly;
