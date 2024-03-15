import React, { useEffect, Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as XLSX from "xlsx";
import PropTypes from "prop-types";
import {
  loadUsersList,
  clearUser,
  updateUsers,
  addUsers,
  importUsers,
  loadSchoolsList,
} from "../../../actions/admin";

import UsersList from "./UsersList";

const Users = ({
  usersList,
  loadUsersList,
  usersListLoading,
  clearUser,
  user,
  importUsers,
  loadSchoolsList,
}) => {
  useEffect(() => {
      // Admin role: Retrive all users from the Admin's school list
      if (user.UserTypeID === 6) {
        loadUsersList({ schoolIds: user.schoolIds });
      }
      // Super Admin role and other roles: Retrive all users from all schools
      else {
        loadUsersList();
      }
  }, [ user, clearUser]);

  const formatStudents = (list) => {
    let arr = [];
    for (let i = 0; i < list.length; i++) {
      arr.push(list[i].StudentID);
    }
    return arr;
  };

  const [file, setFile] = useState(null);
  const hist = useHistory();

  return (
    <Fragment>
      <div className="p-sm-5 p-2 w-100 dashboard-margin">
        <div className="mb-3 ">
          <div className="d-flex align-items-center">
            <h6 className="txt-primary-light mb-0">{user.UserType} / Users</h6>
            <div className="rounded-pill bg-primary px-2 py-1 align-self-center mx-2 my-2 caption ">
              {usersList.length}
            </div>
          </div>
          <div className="d-flex w-100 align-items-center justify-content-end">
            {parseInt(user.UserTypeID) !== 1 && (
              <div className="d-flex">
                <a
                  href={process.env.PUBLIC_URL + "/templates/users.xlsx"}
                  download
                  className="btn button-parent button-primary d-flex align-items-center px-3 mx-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-download button-child"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                  </svg>
                  Template
                </a>

                <div
                  className="btn button-parent button-primary d-flex align-items-center px-3 mx-3"
                  data-bs-toggle="modal"
                  data-bs-target="#ImportUser"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    height="18px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#ffffff"
                    className="button-child"
                  >
                    <g>
                      <rect fill="none" height="18" width="18" />
                    </g>
                    <g>
                      <g>
                        <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
                      </g>
                    </g>
                  </svg>
                  Import Excel
                </div>
                <div
                  className="btn button-parent button-primary d-flex align-items-center px-3"
                  onClick={() => {
                    clearUser();
                    // if (user.UserTypeID === 6) {
                    //   loadSchoolsList().then(() =>
                    //     hist.push("/admin/user/add")
                    //   );
                    // } else if (user.UserTypeID === 5) {
                    //   loadSchoolsList().then(() =>
                    //     hist.push("/admin/user/add")
                    //   );
                    // } else {
                    //   loadSchoolsList({ SchoolID: user.SchoolID }).then(() =>
                    //     hist.push("/admin/user/add")
                    //   );
                    // }
                    loadSchoolsList().then(() => hist.push("/admin/user/add"));
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    height="18px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#ffffff"
                    className="button-child"
                  >
                    <g>
                      <rect fill="none" height="18" width="18" />
                    </g>
                    <g>
                      <g>
                        <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
                      </g>
                    </g>
                  </svg>
                  Add User
                </div>
              </div>
            )}
          </div>
        </div>

        <UsersList
          usersList={
            user.Students === undefined
              ? usersList
              : user.UserTypeID === 6
              ? usersList.filter((user) =>
                  user.schoolIds
                    .split(",")
                    .map((id) => parseInt(id.trim()))
                    .includes(user.SchoolID)
                )
              : usersList.filter((y) =>
                  formatStudents(user.Students).includes(y.UserID)
                )
          }
          usersListLoading={usersListLoading}
          userAuth={user}
        />
      </div>
      <div
        className="modal fade"
        id="ImportUser"
        aria-labelledby="ImportUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ImportUserLabel">
                Import Users
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="file"
                accept=".xlsx"
                onChange={(e) => {
                  e.preventDefault();
                  var files = e.target.files,
                    f = files[0];
                  var reader = new FileReader();
                  reader.onload = function (e) {
                    var data = e.target.result;
                    let readedData = XLSX.read(data, { type: "binary" });
                    const wsname = readedData.SheetNames[0];
                    const ws = readedData.Sheets[wsname];

                    /* Convert array to json*/
                    const dataParse = XLSX.utils.sheet_to_json(ws, {
                      header: 1,
                    });
                    dataParse.splice(0, 1);
                    console.log(dataParse);
                    let d = [];
                    dataParse.forEach((user) => {
                      if (user.length !== 0) {
                        d.push({
                          FirstName: user[0],
                          LastName: user[1],
                          SchoolID: user[2] === undefined ? null : user[2],
                          UserTypeID: user[3],
                          Email:
                            parseInt(user[3]) === 2
                              ? `${
                                  user[0] +
                                  user[1] +
                                  user[2] +
                                  Math.floor(Math.random() * 1000)
                                }@mail.com`
                              : user[4],
                          Password:
                            parseInt(user[3]) === 2
                              ? "121233212321312"
                              : user[5],
                          AlternativeID: user[6] === undefined ? null : user[6],
                        });
                        console.log(d);
                      }
                    });

                    console.log(d);

                    setFile(d);
                  };
                  reader.readAsBinaryString(f);
                }}
              />
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
                  importUsers({ users: file }).then(() => loadUsersList());
                }}
                data-bs-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
Users.propTypes = {
  usersList: PropTypes.array,
  loadUsersList: PropTypes.func.isRequired,
  usersListLoading: PropTypes.bool,
  clearUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  loadSchoolsList: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  usersList: state.admin.usersList,
  usersListLoading: state.admin.usersListLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  loadUsersList,
  clearUser,
  importUsers,
  loadSchoolsList,
})(Users);
