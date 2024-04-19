import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateTrivia,
  addTrivia,
  deleteTrivia,
  clearTrivia,
} from "../../../actions/admin";
import Alert from "../../layouts/Alert";
import PropTypes from "prop-types";
import FileUpload from "../../layouts/FileUpload";
import Toogle from "../../layouts/Toogle";

const TriviaForm = ({
  trivia,
  authUser,
  updateTrivia,
  addTrivia,
  deleteTrivia,
  clearTrivia,
}) => {
  const hist = useHistory();
  const location = useLocation();

  const [formData, setFormData] = useState({
    QuestionID:
      trivia === null
        ? ""
        : trivia.QuestionID !== undefined
        ? trivia.QuestionID
        : "",
    QuestionText:
      trivia === null
        ? ""
        : trivia.QuestionText !== undefined
        ? trivia.QuestionText
        : "",
    Answers:
      trivia === null
        ? [
            { AnswerID: 1, AnswerText: "", isCorrect: false },
            { AnswerID: 2, AnswerText: "", isCorrect: false },
            { AnswerID: 3, AnswerText: "", isCorrect: false },
          ]
        : trivia.Answers !== undefined
        ? trivia.Answers.map((item) => item)
        : [
            { AnswerID: 1, AnswerText: "", isCorrect: false },
            { AnswerID: 2, AnswerText: "", isCorrect: false },
            { AnswerID: 3, AnswerText: "", isCorrect: false },
          ],
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    // Update Answer Text
    if (e.target.id.includes("Answers")) {
      let index = e.target.id.split(" - ")[1];
      let temp = formData.Answers;
      temp[index].AnswerText = e.target.value;
      setFormData({ ...formData, Answers: temp });
    }

    // Update Correct Answer
    if (e.target.id.includes("isCorrect")) {
      let index = e.target.id.split(" - ")[1];
      let temp = formData.Answers.map((answer, i) => {
        if (i === parseInt(index)) {
          // This is the answer that was just edited
          return { ...answer, isCorrect: true };
        } else {
          // All other answers should be set to false
          return { ...answer, isCorrect: false };
        }
      });
      // let temp = formData.Answers;
      // temp[index].isCorrect = Boolean(e.target.value);
      setFormData({ ...formData, Answers: temp });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (location.pathname.includes("add")) {
      console.log("add");

      console.log("Test formData", formData);

      addTrivia(formData).then(() => {
        setFormData({
          QuestionID: "",
          QuestionText: "",
          Answers: null,
          CorrectAnswer: null,
        });
      
      });
    } else if (location.pathname.includes("edit")) {
      console.log("edit");
      updateTrivia(QuestionID, formData);
    }
    hist.push("/admin/trivia");
    clearTrivia();
  };

  const { QuestionID, QuestionText, Answers } = formData;

  if (trivia == null && location.pathname.includes("edit")) {
    hist.push("/admin/trivias");
  }

  return (
    <div className="p-sm-5 p-2 w-100  dashboard-margin mx-lg-auto container">
      <div className="mb-3 ">
        <h6 className="txt-primary-light">{`${authUser.firstName} ${authUser.lastName}`} / Trivias / Trivia</h6>
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
            <h4 className="m-0">
              {location.pathname.includes("add") ? "Add Trivia" : "Edit"}
            </h4>
          </div>
        </div>
      </div>
      <form
        className="card w-100 p-2 p-sm-3 p-lg-4 shadow-lg border-0  mb-2 "
        onSubmit={(e) => onSubmit(e)}
      >
        <Alert />
        <div className="mb-3">
          <div className="txt-primary">Question Text</div>
          <input
            type="text"
            className="form-control rounded "
            id="QuestionText"
            placeholder="Enter Question Text..."
            required
            value={QuestionText}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="mb-3">
          <div className="d-flex flex-column gap-2">
            <div className="txt-primary">Answers</div>
            {Answers?.map((item, index) => (
              <div key={index} className="d-flex gap-2 align-items-center">
                {/* Is Correct Radio button */}
                <input
                  id={`isCorrect - ${index}`}
                  type="radio"
                  name={`isCorrect`}
                  value={item?.isCorrect}
                  checked={item?.isCorrect}
                  onChange={(e) => onChange(e)}
                  className="form-check-input"
                />
                {/* Answer Text */}
                    <input
                    type="text"
                    id={`Answers - ${index}`}
                    value={item?.AnswerText}
                    onChange={(e) => onChange(e)}
                    className="form-control rounded"
                  />
              </div>
            ))}
          </div>
        </div>

        {location.pathname.includes("edit") && (
          <div className="mb-3">
            <div className="txt-primary">Question ID</div>
            <input
              disabled
              type="text"
              className="form-control rounded "
              id="QuestionID"
              placeholder="Enter Question ID..."
              value={QuestionID}
            />
          </div>
        )}

        <div className="d-flex align-items-center justify-content-center">
          <button type="submit" className="button-primary btn-block btn px-5">
            Save
          </button>

          {/* Delete Button */}
          {/* Delete Module */}
          <div
            className="modal fade"
            id="deleteTrivia"
            aria-labelledby="deleteTriviaLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteTriviaLabel">
                    Delete Trivia
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete trivia?
                  <br />
                  <br />
                  <b>
                    <span className="text-danger text-center">
                      Warning Deleting a trivia will result in deleting
                      everything related to it
                    </span>
                  </b>
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
                      deleteTrivia(QuestionID);
                      hist.push("/admin/trivia");
                      clearTrivia();
                    }}
                    data-bs-dismiss="modal"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          {authUser.UserTypeID === 5 && QuestionID !== "" && (
            <div
              className="btn btn-danger d-flex align-items-center px-4 mx-3"
              data-bs-toggle="modal"
              data-bs-target="#deleteTrivia"
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
          )}
        </div>
      </form>
    </div>
  );
};
TriviaForm.propTypes = {
  trivia: PropTypes.object,
  authUser: PropTypes.object.isRequired,
  updateTrivia: PropTypes.func.isRequired,
  deleteTrivia: PropTypes.func.isRequired,
  clearTrivia: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  trivia: state.admin.trivia,
  authUser: state.auth.user,
});

export default connect(mapStateToProps, {
  updateTrivia,
  addTrivia,
  deleteTrivia,
  clearTrivia,
})(TriviaForm);
