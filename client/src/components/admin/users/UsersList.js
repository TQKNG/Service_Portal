import React, { useState, useEffect } from "react";
import Alert from "../../layouts/Alert";
import _ from "lodash";

import UserListItem from "./UserListItem";
import Search from "../../layouts/Search";
import UserFilter from "./UserFilter";
import SortIcon from "../../layouts/SortIcon";

const UsersList = ({ usersList, usersListLoading }) => {
  const [listSearch, setListSearch] = useState(usersList);

  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    roleID: null,
    DeviceID: "",
    HardwareID: null,
    ConnectionString: "",
  });

  const [page, setPage] = useState(1);

  const [sortKeys, setSortKeys] = useState([]);

  const [icons, setIcons] = useState({
    id: 0,
    name: 0,
    email: 0,
    username:0,
    role: 0,
  });
  const [isShowIcon, setIsShowIcon] = useState(null);

  const { id, name, email, role, username } = icons;

  // Filter logic
  useEffect(() => {
    // Whenever there is sort key change
    if (sortKeys.length > 0) {
      setListSearch(
        _.orderBy(
          searchInput(filterInput(usersList, formData), search),
          getKeys(sortKeys),
          getOrder(sortKeys)
        )
      );
    } else {
      setListSearch(searchInput(filterInput(usersList, formData), search));
    }
  }, [sortKeys]);

  useEffect(() => {
    if (!usersListLoading) {
      const sortedList = _.sortBy(usersList, _.property("userID"));
      setListSearch(sortedList);
    }
  }, [usersListLoading, setListSearch, usersList]);

  const getKeys = (arr) => {
    return arr.map((a) => a.key);
  };
  const getOrder = (arr) => {
    return arr.map((a) => a.order);
  };

  const setFilter = (data) => {
    setIcons({
      id: 0,
      name: 0,
      email: 0,
      username:0,
      role: 0,
    });
    setListSearch(filterInput(listSearch, data));
  };

  const searchInput = (arr, word) => {
    return arr.filter(
      (item) =>
        (
          item.firstName?.toUpperCase() +
          " " +
          item.lastName?.toUpperCase()
        ).includes(word.toUpperCase()) ||
        item.email?.toUpperCase().includes(word.toUpperCase())
    );
  };

  const filterInput = (arr, data) => {
    console.log('arr',arr)// userlist
    console.log('data', data) // formdata
    let results = arr.filter(
      (item) =>
        item.firstName?.toUpperCase().includes(data.firstName?.toUpperCase()) &&
        item.lastName?.toUpperCase().includes(data.lastName?.toUpperCase()) &&
        item.email?.toUpperCase().includes(data.email?.toUpperCase()) 
    );

    console.log("Testsssss", results);
    return results;
  };

  const onChange =(e)=>{
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <div className="card w-100 p-2 p-sm-3 p-lg-5 shadow-lg border-0 users-list ">
      <Alert />
      <div className="d-flex w-100 align-items-center justify-content-between mb-3">
        <div className="">
          {!usersListLoading && listSearch?.length / 15 > 1 && (
            <nav aria-label="Page navigation txt-primary">
              <ul className="pagination txt-primary">
                {page > 1 && (
                  <li className="page-item" onClick={() => setPage(page - 1)}>
                    <div
                      className="page-link txt-primary"
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </div>
                  </li>
                )}
                {listSearch.map((num, id) => {
                  let ind = id + 1;

                  if (ind <= Math.ceil(listSearch.length / 15))
                    return (
                      <li
                        className="page-item"
                        onClick={() => setPage(ind)}
                        key={id}
                      >
                        <div
                          className={`page-link txt-primary ${
                            ind === page ? "page-selected" : ""
                          }`}
                        >
                          {ind}
                        </div>
                      </li>
                    );
                })}
                {page < listSearch.length / 15 && (
                  <li className="page-item" onClick={() => setPage(page + 1)}>
                    <div className="page-link txt-primary" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </div>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
        <div className="d-flex">
          {/* <Search
            setListSearch={setListSearch}
            setSearch={setSearch}
            filter={(e) => {
              setIcons({
                name: 0,
                email: 0,
                username:0,
                role: 0,
              });

              return searchInput(
                filterInput(usersList, formData),
                e.target.value
              );
            }}
          /> */}
          {/* <UserFilter
            searchInput={searchInput}
            search={search}
            setFilter={setFilter}
            usersList={usersList}
            formData={formData}
            setFormData={setFormData}
            setListSearch={setListSearch}
          /> */}
        </div>
      </div>
      <div className="admin-users-fields  d-flex align-items-center justify-space-between rounded  bg-body txt-primary">
        {/* First Name Header */}
        <div
          className="admin-users-field text-truncate "
          // onClick={() => {
          //   /*
          //   1. Set array of sortKeys where
          //   [{key: 'FirstName', order: 'asc'}, ....]

          //   2. Set array icons where
          //   {
          //     id: 0,
          //     name: 1,
          //     email: 0,
          //     school: 0,
          //     role: 0,
          //    }
          //   */
          //   if (name === 0) {
          //     setSortKeys([...sortKeys, { key: "firstName", order: "asc" }]);
          //     setIcons({ ...icons, name: 1 });
          //   } else if (name === 1) {
          //     setSortKeys(
          //       sortKeys.map((a) => {
          //         if (a.key === "firstName") return { ...a, order: "desc" };
          //         return a;
          //       })
          //     );
          //     setIcons({ ...icons, name: -1 });
          //   } else {
          //     setSortKeys(sortKeys.filter((a) => a.key !== "firstName"));
          //     setIcons({ ...icons, name: 0 });
          //   }
          // }}
          // onMouseEnter={() => setIsShowIcon("name")}
          // onMouseLeave={() => setIsShowIcon(null)}
        >
          Full Name
          {/* <SortIcon icon={name} isShowIcon={isShowIcon === "name"} /> */}
        </div>

        {/* Email Header */}
        <div
          className="admin-users-field  text-truncate d-md-block d-none "
          // onClick={() => {
          //   if (email === 0) {
          //     setSortKeys([...sortKeys, { key: "email", order: "asc" }]);

          //     setIcons({
          //       ...icons,
          //       email: 1,
          //     });
          //   } else if (email === 1) {
          //     setSortKeys(
          //       sortKeys.map((a) => {
          //         if (a.key === "email") return { ...a, order: "desc" };
          //         return a;
          //       })
          //     );

          //     setIcons({
          //       ...icons,
          //       email: -1,
          //     });
          //   } else {
          //     setSortKeys(sortKeys.filter((a) => a.key !== "email"));

          //     setIcons({
          //       ...icons,
          //       email: 0,
          //     });
          //   }
          // }}
          // onMouseEnter={() => setIsShowIcon("email")}
          // onMouseLeave={() => setIsShowIcon(null)}
        >
          Email
          {/* <SortIcon icon={email} isShowIcon={isShowIcon === "email"} /> */}
        </div>

        {/* User Name Header */}
        <div
          className="admin-users-field text-truncate"
          // onClick={() => {
          //   if (username === 0) {
          //     setSortKeys([...sortKeys, { key: "userName", order: "asc" }]);

          //     setIcons({
          //       ...icons,
          //       username: 1,
          //     });
          //   } else if (username === 1) {
          //     setSortKeys(
          //       sortKeys.map((a) => {
          //         if (a.key === "userName") return { ...a, order: "desc" };
          //         return a;
          //       })
          //     );

          //     setIcons({
          //       ...icons,
          //       username: -1,
          //     });
          //   } else {
          //     setSortKeys(sortKeys.filter((a) => a.key !== "userName"));

          //     setIcons({
          //       ...icons,
          //       username: 0,
          //     });
          //   }
          // }}
          // onMouseEnter={() => setIsShowIcon("username")}
          // onMouseLeave={() => setIsShowIcon(null)}
        >
          User Name
          {/* <SortIcon icon={username} isShowIcon={isShowIcon === "username"} /> */}
        </div>

        {/* Role Header */}
        <div
          className="admin-users-field text-truncate "
          // onClick={() => {
          //   if (role === 0) {
          //     setSortKeys([
          //       ...sortKeys,
          //       { key: "roleID", order: "asc" },
          //     ]);
          //     setIcons({
          //       ...icons,
          //       role: 1,
          //     });
          //   } else if (role === 1) {
          //     setSortKeys(
          //       sortKeys.map((a) => {
          //         if (a.key === "roleID") return { ...a, order: "desc" };
          //         return a;
          //       })
          //     );

          //     setIcons({
          //       ...icons,
          //       role: -1,
          //     });
          //   } else {
          //     setSortKeys(sortKeys.filter((a) => a.key !== "roleID"));
          //     setIcons({
          //       ...icons,
          //       role: 0,
          //     });
          //   }
          // }}
          // onMouseEnter={() => setIsShowIcon("role")}
          // onMouseLeave={() => setIsShowIcon(null)}
        >
          Role
          {/* <SortIcon icon={role} isShowIcon={isShowIcon === "role"} /> */}
        </div>

        {/* Device ID Header*/}
        {/* <div
          className="admin-users-field text-truncate d-md-block d-none"
          onClick={() => {
            listSearch.forEach((item, id) => {
              let l = listSearch;
              if (item.SchoolName === null) {
                l[id].SchoolName = "";
              }
              setListSearch(l);
            });

            if (school === 0) {
              setSortKeys([...sortKeys, { key: "SchoolName", order: "asc" }]);

              setIcons({
                ...icons,
                school: 1,
              });
            } else if (school === 1) {
              setSortKeys(
                sortKeys.map((a) => {
                  if (a.key === "SchoolName") return { ...a, order: "desc" };
                  return a;
                })
              );

              setIcons({
                ...icons,
                school: -1,
              });
            } else {
              setSortKeys(sortKeys.filter((a) => a.key !== "SchoolName"));

              setIcons({
                ...icons,
                school: 0,
              });
            }
          }}
          onMouseEnter={() => setIsShowIcon("school")}
          onMouseLeave={() => setIsShowIcon(null)}
        >
          Device ID
          <SortIcon icon={school} isShowIcon={isShowIcon === "school"} />
        </div> */}

        {/* Hardware ID Header*/}
        {/* <div
          className="admin-users-field text-truncate d-md-block d-none"
          onClick={() => {
            listSearch.forEach((item, id) => {
              let l = listSearch;
              if (item.SchoolName === null) {
                l[id].SchoolName = "";
              }
              setListSearch(l);
            });

            if (school === 0) {
              setSortKeys([...sortKeys, { key: "SchoolName", order: "asc" }]);

              setIcons({
                ...icons,
                school: 1,
              });
            } else if (school === 1) {
              setSortKeys(
                sortKeys.map((a) => {
                  if (a.key === "SchoolName") return { ...a, order: "desc" };
                  return a;
                })
              );

              setIcons({
                ...icons,
                school: -1,
              });
            } else {
              setSortKeys(sortKeys.filter((a) => a.key !== "SchoolName"));

              setIcons({
                ...icons,
                school: 0,
              });
            }
          }}
          onMouseEnter={() => setIsShowIcon("school")}
          onMouseLeave={() => setIsShowIcon(null)}
        >
          Hardware ID
          <SortIcon icon={school} isShowIcon={isShowIcon === "school"} />
        </div> */}

        {/* Connection String Header */}
        {/* <div
          className="admin-users-field text-truncate"
          onClick={() => {
            if (role === 0) {
              setSortKeys([...sortKeys, { key: "UserType", order: "asc" }]);

              setIcons({
                ...icons,
                school: 0,
                role: 1,
              });
            } else if (role === 1) {
              setSortKeys(
                sortKeys.map((a) => {
                  if (a.key === "UserType") return { ...a, order: "desc" };
                  return a;
                })
              );

              setIcons({
                ...icons,
                role: -1,
              });
            } else {
              setSortKeys(sortKeys.filter((a) => a.key !== "UserType"));

              setIcons({
                ...icons,
                role: 0,
              });
            }
          }}
          onMouseEnter={() => setIsShowIcon("role")}
          onMouseLeave={() => setIsShowIcon("role")}
        >
          Connection String
          <SortIcon icon={role} isShowIcon={isShowIcon === "role"} />
        </div> */}

        {/* <div className="admin-users-field text-truncate ml-1">Actions</div> */}
      </div>
      <div className="users-list-body">
        {usersListLoading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="spinner-border txt-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          listSearch
            ?.slice(15 * (page - 1), 15 * page)
            .map((user, id) => <UserListItem user={user} key={id} />)
        )}
      </div>
    </div>
  );
};

export default UsersList;
