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

import Dashboard from "./dashboard/Dashboard";
import IdleTimer from "../layouts/IdleTimer";

import { logout } from "../../actions/auth";
import Receptions from "./reception/Receptions";
import Songs from "./song/Songs";
import Books from "./book/Books";
import Jokes from "./joke/Jokes";
import JokeForm from "./joke/JokeForm";
import Trivias from "./trivia/Trivias";
import Setting from "./settings/Setting";
import SongForm from "./song/SongForm";
import BookForm from "./book/BookForm";
import TriviaForm from "./trivia/TriviaForm";

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
          {user.roleID === 5 && (
            <Sidebar
              users={true}
              dashboard={true}
              receptions={true}
              songs={true}
              books={true}
              jokes={true}
              trivias={true}
              setting={true}
              schedules={true}
            />
          )}
          {location.pathname === "/admin/dashboard" && <Dashboard />}
          {location.pathname === "/admin/users" && <Users />}
          {location.pathname === "/admin/user/add" && <UserForm />}
          {location.pathname === "/admin/user/edit" && <UserForm />}
          {location.pathname === "/admin/user/report" && <UserReport />}
          {location.pathname.includes("/admin/user/userId=") && (
            <User userId={match.params.userId} />
          )}

          {/* Reception */}
          {location.pathname === "/admin/reception" && <Receptions />}

          {/* Setting */}
          {location.pathname === "/admin/setting" && <Setting />}

          {/* Song */}
          {location.pathname === "/admin/song" && <Songs />}
          {location.pathname === "/admin/song/edit" && <SongForm />}
          {location.pathname === "/admin/song/add" && <SongForm />}

          {/* Book */}
          {location.pathname === "/admin/book" && <Books />}
          {location.pathname === "/admin/book/edit" && <BookForm />}
          {location.pathname === "/admin/book/add" && <BookForm />}

          {/* Joke */}
          {location.pathname === "/admin/joke" && <Jokes />}
          {location.pathname === "/admin/joke/edit" && <JokeForm />}
          {location.pathname === "/admin/joke/add" && <JokeForm />}

          {/* Trivia */}
          {location.pathname === "/admin/trivia" && <Trivias />}
          {location.pathname === "/admin/trivia/edit" && <TriviaForm />}
          {location.pathname === "/admin/trivia/add" && <TriviaForm />}

          {/* Schedule */}
          {location.pathname === "/admin/schedule" && <Schedules />}
          {/* {location.pathname === "/admin/schedule/edit" && <ScheduleForm />}
          {location.pathname === "/admin/schedule/add" && <ScheduleForm />} */}
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
