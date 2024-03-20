import React, { Fragment } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Sidebar from "../layouts/Sidebar";
import Loading from "../layouts/Loading";

import Users from "./users/Users";
import User from "./users/User";
import UserForm from "./users/UserForm";
import UserReport from "./users/UserReport";

import Schools from "./schools/Schools";
import School from "./schools/School";
import SchoolForm from "./schools/SchoolForm";

import Assessments from "./assessments/Assessments";
import AssessmentForm from "./assessments/AssessmentForm";
import Assessment from "./assessments/Assessment";

import Results from "./results/Results";
import Result from "./results/Result";

import Dashboard from "./dashboard/Dashboard";
import CompareDashboard from "./dashboard/CompareDashboard";

import Classrooms from "./classroom/Classrooms";
import ClassroomForm from "./classroom/ClassroomForm";
import Classroom from "./classroom/Classroom";
import ClassroomReport from "./classroom/ClassroomReport";
import IdleTimer from "../layouts/IdleTimer";

import { logout } from "../../actions/auth";
import ResultFinalize from "./results/ResultFinalize";
import Receptions from "./reception/Receptions";

const Admin = ({ match, user, isAuthenticated, loading, logout }) => {
  const location = useLocation();
  const hist = useHistory();

  if (!isAuthenticated && !loading) {
    hist.push("/");
  }

  return (
    <Fragment>
      {user !== null && isAuthenticated ? (
        <div
          className="d-flex h-100 position-relative "
          style={{ paddingTop: "80px" }}
        >
          <IdleTimer logout={logout} />
          {/* Teacher Role */}
          {user.UserTypeID === 1 && (
            <Sidebar
              users={true}
              schools={false}
              dashboard={true}
              assessments={false}
              results={true}
              classrooms={true}
              receptions={true}
            />
          )}

          {/* Vice Principal and Principal Role */}
          {(user.UserTypeID === 3 || user.UserTypeID === 4) && (
            <Sidebar
              users={true}
              schools={false}
              dashboard={true}
              assessments={true}
              results={true}
              classrooms={true}
              receptions={true}
            />
          )}

          {user.UserTypeID === 5 && (
            <Sidebar
              users={true}
              schools={true}
              dashboard={true}
              assessments={true}
              results={true}
              classrooms={true}
              receptions={true}
            />
          )}

          {user.UserTypeID === 6 && (
            <Sidebar
              users={true}
              schools={true}
              dashboard={true}
              assessments={true}
              results={true}
              classrooms={true}
              receptions={true}
            />
          )}

          {location.pathname === "/admin/result" && <Results />}

          {location.pathname === "/admin/dashboard" && <Dashboard />}
          {location.pathname === "/admin/dashboard/compare" && (
            <CompareDashboard />
          )}
          {location.pathname.includes("/admin/result/resultId=") && (
            <Result resultId={match.params.resultId} />
          )}

          {location.pathname === "/admin/classrooms" && <Classrooms />}
          {location.pathname === "/admin/classroom/add" && <ClassroomForm />}
          {location.pathname === "/admin/classroom/edit" && <ClassroomForm />}
          {location.pathname === "/admin/classroom/report" && (
            <ClassroomReport />
          )}
          {location.pathname.includes("/admin/classroom/classroomId=") && (
            <Classroom classroomId={match.params.classroomId} />
          )}

          {location.pathname === "/admin/users" && <Users />}
          {location.pathname === "/admin/user/add" && <UserForm />}
          {location.pathname === "/admin/user/edit" && <UserForm />}
          {location.pathname === "/admin/user/report" && <UserReport />}
          {location.pathname.includes("/admin/user/userId=") && (
            <User userId={match.params.userId} />
          )}
          {location.pathname === "/admin/schools" && <Schools />}
          {location.pathname === "/admin/school/add" && <SchoolForm />}
          {location.pathname === "/admin/school/edit" && <SchoolForm />}
          {location.pathname.includes("/admin/school/schoolId=") && (
            <School schoolId={match.params.schoolId} />
          )}
          {location.pathname === "/admin/assessments" && <Assessments />}
          {location.pathname === "/admin/assessment/add" && <AssessmentForm />}
          {location.pathname === "/admin/assessment/edit" && <AssessmentForm />}
          {location.pathname.includes("/admin/assessment/assessmentId=") && (
            <Assessment
              assessmentId={match.params.assessmentId}
              categoryId={match.params.categoryId}
            />
          )}
          {location.pathname === "/admin/classes" && <p>1</p>}
          {location.pathname === "/admin/grades" && <p>1</p>}

          {/* Reception */}
          {location.pathname === "/admin/reception" && <Receptions />}
        </div>
      ) : (
        <div className="d-flex align-items-center h-100 justify-content-center">
          <Loading />
        </div>
      )}
    </Fragment>
  );
};
Admin.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Admin);
