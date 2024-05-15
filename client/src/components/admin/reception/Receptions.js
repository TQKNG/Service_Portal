import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  loadReceptionsList,
  clearReception,
} from "../../../actions/admin";
import ReceptionsList from "./ReceptionsList";
import DashboardExport from "../dashboard/DashboardExport";

const Receptions = ({
  authUser,
  receptionsList,
  loadReceptionsList,
  receptionListLoading,
  clearReception,
}) => {
  const hist = useHistory();

  const formatReport = (report) => {
    return report.map((item) => {
      delete item.visitID
      delete item.isDeleted
      return {
       ...item,
        signInDate: new Date(item.signInDate),
        signOutDate: new Date(item.signOutDate),
      };
    });
  }
  useEffect(() => {
    if (receptionsList.length === 0 && receptionListLoading) {
      loadReceptionsList();
    }
  }, [receptionsList, receptionListLoading, loadReceptionsList]);
  return (
    <Fragment>
      <div className="p-sm-5 p-2 w-100 dashboard-margin">
        <div className="mb-3 ">
          <div className="d-flex align-items-center">
            <h6 className="txt-primary-light mb-0">{`${authUser.firstName} ${authUser.lastName}`}/ Visitors</h6>{" "}
            <div className="rounded-pill bg-primary px-2 py-1 align-self-center mx-2 my-2 caption ">
              {receptionsList.length}
            </div>
          </div>
          {/* Template */}
          <div className="d-flex w-100 align-items-center justify-content-end">
            {/* {authUser.roleID === 5 && (
              <>
                <div className="d-flex">
                  <div
                    className="btn button-parent button-primary d-flex align-items-center px-3"
                    onClick={() => {
                      hist.push("/admin/reception/add");
                      clearReception();
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
                    Add In/Out
                  </div>
                </div>
              </>
            )} */}
            <DashboardExport reportName={`Visits-${new Date().toLocaleString()}`} reports={formatReport(receptionsList)} />
          </div>
        </div>
        <ReceptionsList
          receptionsList={
             receptionsList
          }
          receptionListLoading={receptionListLoading}
        />
      </div>
    </Fragment>
  );
};

Receptions.propTypes = {
  receptionsList: PropTypes.array,
  authUser: PropTypes.object,
  loadReceptionsList: PropTypes.func.isRequired,
  receptionListLoading: PropTypes.bool,
  clearReception: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  receptionsList: state.admin.receptionsList,
  receptionListLoading: state.admin.receptionListLoading,
  authUser: state.auth.user,
});

export default connect(mapStateToProps, {
  loadReceptionsList,
  clearReception,
})(Receptions);
