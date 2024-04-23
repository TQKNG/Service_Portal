import React, { useEffect, useState } from "react";
import Alert from "../../layouts/Alert";
import _ from "underscore";
import Search from "../../layouts/Search";
import SortIcon from "../../layouts/SortIcon";
import ReceptionListItem from "./ReceptionListItem";
import "react-toastify/dist/ReactToastify.css";

const ReceptionsList = ({ receptionsList, receptionListLoading }) => {
  const [listSearch, setListSearch] = useState(receptionsList);
  const [page, setPage] = useState(1);
  const [icons, setIcons] = useState({
    name: 0,
  });
  const [isShowIcon, setIsShowIcon] = useState(null);

  const { name } = icons;

  useEffect(() => {
    if (!receptionListLoading) {
      // on initial load, sort by InOutID ASC - default
      const sortedList = _.sortBy(receptionsList, _.property("visitID"));

      setListSearch(sortedList);
    }
  }, [receptionListLoading, setListSearch, receptionsList]);

  return (
    <div className="card w-100 p-2 p-sm-3 p-lg-5 shadow-lg border-0 users-list ">
      <Alert />
      <div className="d-flex w-100 align-items-center justify-content-between mb-3">
        <div className="">
          {!receptionListLoading && listSearch.length / 15 > 1 && (
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
          <Search
            setListSearch={setListSearch}
            filter={(e) => {
              const list = receptionsList.filter((item) =>
                item.firstName.toUpperCase().includes(
                  e.target.value.toUpperCase()
                )
              );
              return list;
            }}
          />
        </div>
      </div>
      <div className="admin-users-fields  d-flex align-items-center justify-content-around rounded  bg-body txt-primary">
          {/* Full Name */}
        <div
          className="admin-large-field  text-truncate mx-auto"
          onMouseEnter={() => setIsShowIcon("name")}
          onMouseLeave={() => setIsShowIcon(null)}
          onClick={() => {
            if (name === 0 && receptionsList.length) {
              const sortedList = _.sortBy(receptionsList, (reception) => {
                const name = reception.firstName;
                if (/^\d/.test(name)) {
                  return 0; // Numbers should come first
                } else {
                  return name.toLowerCase(); // Convert to lowercase to ensure case-insensitive sorting
                }
              });
              setListSearch(sortedList);
              setIcons({
                name: 1,
              });
            } else if (name === 1) {
              const sortedList = _.sortBy(listSearch, [
                (reception) => reception.firstName.toLowerCase(),
              ]).reverse();
              setListSearch(sortedList);
              setIcons({
                name: -1,
              });
            } else {
              const sortedList = _.sortBy(
                receptionsList,
                _.property("visitID")
              );
              setListSearch(sortedList);
              setIcons({
                name: 0,
              });
            }
          }}
        >
          Full Name
          <SortIcon icon={name} isShowIcon={isShowIcon === "name"} />
        </div>
        {/* Phone Number */}
        <div className="admin-large-field text-truncate mx-auto">Phone Number</div>

        {/* Sign In Time */}
        <div className="admin-schools-field text-truncate mx-auto">Sign In Time</div>

        {/* Sign Out Time */}
        <div className="admin-schools-field text-truncate mx-auto">Sign Out Time</div>

        {/* Home Areas */}
        <div className="admin-schools-field text-truncate mx-auto">Home Areas</div>

        {/* Scheduled Visit */}
        <div className="admin-schools-field text-truncate mx-auto">Scheduled Visit</div>

        {/* Purpose */}
        <div className="admin-schools-field text-truncate mx-auto">Purpose</div>

        {/* Resident Name */}
        <div className="admin-schools-field text-truncate mx-auto">Resident Name</div>

        {/* First Visit */}
        <div className="admin-schools-field text-truncate mx-auto">First Visit</div>

        {/* Sickness Symptom */}
        <div className="admin-schools-field text-truncate mx-auto">Sickness Symptom</div>

        {/* Acknowledgement */}
        <div className="admin-schools-field text-truncate mx-auto">Acknowledgement</div>

        {/* Status */}
        <div className="admin-schools-field text-truncate mx-auto">Status</div>

        {/* Edit */}
        <div className="admin-schools-field text-truncate mx-auto">Actions</div>
      </div>

      <div className="users-list-body ">
        {receptionListLoading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div class="spinner-border txt-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : receptionsList.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="txt-primary">No Visits Found</div>
          </div>
        ) : (
          listSearch
            .slice(15 * (page - 1), 15 * page)
            .map((reception, id) => (
              <ReceptionListItem reception={reception} key={id} />
            ))
        )}
      </div>
    </div>
  );
};

export default ReceptionsList;
