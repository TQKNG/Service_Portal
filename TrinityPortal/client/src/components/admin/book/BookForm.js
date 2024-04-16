import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateBook,
  addBook,
  deleteBook,
  clearBook,
} from "../../../actions/admin";
import Alert from "../../layouts/Alert";
import PropTypes from "prop-types";
import FileUpload from "../../layouts/FileUpload";

const BookForm = ({
  book,
  authUser,
  updateBook,
  addBook,
  deleteBook,
  clearBook,
}) => {
  const hist = useHistory();
  const location = useLocation();

  const [formData, setFormData] = useState({
    BookID: book === null ? "" : book.BookID !== undefined ? book.BookID : "",
    Name: book === null ? "" : book.Name !== undefined ? book.Name : "",
    BookText:
      book === null ? "" : book.BookText !== undefined ? book.BookText : "",
    BookCover:
      book === null ? "" : book.BookCover !== undefined ? book.BookCover : "",
    TextCount: book === null ? 0 : book.TextCount !== undefined ? book.TextCount : 0,  
  });

  const onChange = (e) => {
    const newFormData = { ...formData, [e.target.id]: e.target.value };

    if(e.target.id === 'BookText') {
      // Count words in the text
      newFormData.TextCount = countWords(e.target.value);
    }

    setFormData(newFormData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (location.pathname.includes("add")) {
      console.log("add");

      console.log("Test formData", formData);

      // addBook(formData).then(() => {
      //   setFormData({
      //     BookID: "",
      //     Name: "",
      //     BookCover: "",
      //     BookText: "",
      //   });
      // });
    } else if (location.pathname.includes("edit")) {
      // console.log("edit");
      // updateBook(BookID, formData);
      // hist.push("/admin/books");
      // clearBook();
    }
  };

  // Count words in the text
  const countWords = (text) => {
    const words = text.trim().split(/\s+/);
    return words.filter((word) => word !== "").length;
  };

  const { Name, BookID, BookCover, BookText } = formData;

  if (book == null && location.pathname.includes("edit")) {
    hist.push("/admin/books");
  }

  return (
    <div className="p-sm-5 p-2 w-100  dashboard-margin mx-lg-auto container">
      <div className="mb-3 ">
        <h6 className="txt-primary-light">Admin / Books / Book</h6>
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
              {location.pathname.includes("add") ? "Add Book" : "Edit"}
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
          <div className="txt-primary">Name</div>
          <input
            type="text"
            className="form-control rounded "
            id="Name"
            placeholder="Enter Name..."
            required
            value={Name}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="mb-3">
          <div className="txt-primary">Book Text</div>
          <textarea
            type="text"
            className="form-control rounded"
            rows="4"
            cols="50"
            id="BookText"
            placeholder="Enter Book Text..."
            required
            value={BookText}
            onChange={(e) => onChange(e)}
          />
          <span>Word Count: {formData.TextCount}</span>
        </div>

        <div className="mb-3">
          <div className="d-flex flex-column align-items-start gap-2">
            <div className="txt-primary">Book Cover {'(Optional)'}</div>
            {/* Display of the image */}
            {formData.BookCover !== "" && (
              <img
                src={formData.BookCover}
                alt=""
                srcset=""
                width="200px"
              />
            )}
          </div>
          <FileUpload
            instructionText={
              "Drag and drop book image file here, or click to browse book image"
            }
            imgSrc={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50"
                viewBox="0 -960 960 960"
                width="50"
                fill="#1ba587"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm480-480v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM240-280h480L570-480 450-320l-90-120-120 160Zm-40-480v560-560Z" />
              </svg>
            }
            module={"book"}
            setFormData={setFormData}
            formData={formData}
            fieldType={"image"}
          />
        </div>

        {location.pathname.includes("edit") && (
          <div className="mb-3">
            <div className="txt-primary">BookID</div>
            <input
              disabled
              type="text"
              className="form-control rounded "
              id="BookID"
              placeholder="Enter book ID..."
              value={BookID}
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
            id="deleteBook"
            aria-labelledby="deleteBookLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteBookLabel">
                    Delete Book
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete book?
                  <br />
                  <br />
                  <b>
                    <span className="text-danger text-center">
                      Warning Deleting abook will result in deleting everything
                      related to it
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
                      deleteBook(BookID);
                      hist.push("/admin/books");
                      clearBook();
                    }}
                    data-bs-dismiss="modal"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          {authUser.UserTypeID === 5 && BookID !== "" && (
            <div
              className="btn btn-danger d-flex align-items-center px-4 mx-3"
              data-bs-toggle="modal"
              data-bs-target="#deleteBook"
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
BookForm.propTypes = {
  book: PropTypes.object,
  authUser: PropTypes.object.isRequired,
  updateBook: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  clearBook: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  book: state.admin.book,
  authUser: state.auth.user,
});

export default connect(mapStateToProps, {
  updateBook,
  addBook,
  deleteBook,
  clearBook,
})(BookForm);
