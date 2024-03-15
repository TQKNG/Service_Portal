import React, { useState } from "react";

const AssessmentFormBody = ({ formData, onChange, setFormData }) => {
  const [bodyItems, setBodyItems] = useState(
    Array.isArray(formData.Body)
      ? formData.Body
      : [{ Word: "", Solution: "", SolutionDetails: "", Scores: "" }]
  );

  const removeItem = (arr, id) => {
    let array = [];
    for (let i = 0; i < arr.length; i++) {
      if (i !== id) {
        array.push(arr[i]);
      }
    }
    setFormData({ ...formData, Body: array });
    setBodyItems(array);
  };

  const { CategoryID } = formData;

  return (
    <div class="accordion shadow border-0 mt-3" id="body">
      <div class="accordion-item border-0">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button focus-primary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Body
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse show"
          aria-labelledby="headingTwo"
          data-bs-parent="#body"
        >
          <div class="accordion-body">
            {CategoryID <= 4 && (
              <>
                <textarea
                  class="form-control border-primary"
                  rows="5"
                  required
                  placeholder={
                    CategoryID === 3
                      ? "Please add the text"
                      : CategoryID === 4
                      ? "Please add the Words comma separated i.e. AOL,TEK,REL"
                      : CategoryID <= 2
                      ? "Please add the letters comma separated i.e. A,B,C"
                      : ""
                  }
                  value={formData.Body.split("&nbsp;").join(" ")}
                  id="Body"
                  onChange={(e) => onChange(e)}
                ></textarea>
                {formData.CategoryID === 3&&<div>Word Count: {formData?.bodyCount} </div>}
              </>
            )}
            {(CategoryID === 5 || CategoryID === 6) && (
              <div className="">
                {bodyItems.map((item, id) => {
                  return (
                    <div className="d-flex mb-3" key={id}>
                      <div className="d-flex w-80 justify-content-around align-items-end">
                        <div className="w-20">
                          <label htmlFor="word" className="w-100 text-truncate">
                            Word
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="Word"
                            value={item.Word}
                            required
                            placeholder="Please enter a word..."
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                Body: [
                                  ...bodyItems.slice(0, id),
                                  {
                                    ...bodyItems[id],
                                    Word: e.target.value,
                                  },
                                  ...bodyItems.slice(id + 1),
                                ],
                              });
                              setBodyItems([
                                ...bodyItems.slice(0, id),
                                {
                                  ...bodyItems[id],
                                  Word: e.target.value,
                                },
                                ...bodyItems.slice(id + 1),
                              ]);
                            }}
                          />
                        </div>
                        <div className="w-20">
                          <label htmlFor="word">
                            {CategoryID === 6
                              ? "Correct / 2 points"
                              : "Solution"}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="Solution"
                            value={item.Solution}
                            required
                            placeholder="Please enter the solution..."
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                Body: [
                                  ...bodyItems.slice(0, id),
                                  {
                                    ...bodyItems[id],
                                    Solution: e.target.value,
                                  },
                                  ...bodyItems.slice(id + 1),
                                ],
                              });
                              setBodyItems([
                                ...bodyItems.slice(0, id),
                                {
                                  ...bodyItems[id],
                                  Solution: e.target.value,
                                },
                                ...bodyItems.slice(id + 1),
                              ]);
                            }}
                          />
                        </div>
                        {CategoryID === 6 && (
                          <div className="w-20">
                            <label
                              htmlFor="word"
                              className="w-100 text-truncate"
                            >
                              Correct / 1 point
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="SolutionDetails"
                              value={item.SolutionDetails}
                              required
                              placeholder="Please enter the solution..."
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  Body: [
                                    ...bodyItems.slice(0, id),
                                    {
                                      ...bodyItems[id],
                                      SolutionDetails: e.target.value,
                                    },
                                    ...bodyItems.slice(id + 1),
                                  ],
                                });
                                setBodyItems([
                                  ...bodyItems.slice(0, id),
                                  {
                                    ...bodyItems[id],
                                    SolutionDetails: e.target.value,
                                  },
                                  ...bodyItems.slice(id + 1),
                                ]);
                              }}
                            />
                          </div>
                        )}
                        <div className="w-20">
                          <label htmlFor="word">Score</label>
                          <input
                            type="number"
                            className="form-control"
                            id="Scores"
                            value={CategoryID === 6 ? 2 : item.Scores}
                            readOnly={CategoryID === 6}
                            required
                            placeholder="Please enter the Scores..."
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                Body: [
                                  ...bodyItems.slice(0, id),
                                  {
                                    ...bodyItems[id],
                                    Scores: e.target.value,
                                  },
                                  ...bodyItems.slice(id + 1),
                                ],
                              });
                              setBodyItems([
                                ...bodyItems.slice(0, id),
                                {
                                  ...bodyItems[id],
                                  Scores: e.target.value,
                                },
                                ...bodyItems.slice(id + 1),
                              ]);
                            }}
                          />
                        </div>
                      </div>
                      {id === bodyItems.length - 1 && (
                        <div
                          className="align-self-end"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              Body: [
                                ...bodyItems,
                                {
                                  Word: "",
                                  Solution: "",
                                  SolutionDetails: "",
                                  Scores: "",
                                },
                              ],
                            });
                            setBodyItems([
                              ...bodyItems,
                              {
                                Word: "",
                                Solution: "",
                                SolutionDetails: "",
                                Scores: "",
                              },
                            ]);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="37.6"
                            height="37.6"
                            fill="currentColor"
                            class="bi bi-plus add-item-btn rounded-circle border border-primary txt-primary border-2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                          </svg>
                        </div>
                      )}
                      {bodyItems.length > 1 && (
                        <div
                          className={`align-self-end ${
                            id === bodyItems.length - 1 ? "mx-2" : ""
                          }`}
                          onClick={() => {
                            removeItem(bodyItems, id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="37.6"
                            height="37.6"
                            fill="currentColor"
                            class="bi bi-trash delete-item-btn rounded-circle border  border-2 p-2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fill-rule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {bodyItems.length > 1 && parseInt(CategoryID) > 4 && (
              <div className="d-flex justify-content-end">
                <button
                  className="btn button-primary"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      Body: [
                        {
                          Word: "",
                          Solution: "",
                          SolutionDetails: "",
                          Scores: "",
                        },
                      ],
                    });
                    setBodyItems([
                      {
                        Word: "",
                        Solution: "",
                        SolutionDetails: "",
                        Scores: "",
                      },
                    ]);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFormBody;
