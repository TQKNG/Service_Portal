import React from "react";
//Design
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import store from "./store";

// Components
import Auth from "./components/auth/Auth";
import Navbar from "./components/layouts/Navbar";
import Admin from "./components/admin/Admin";
import AssessmentJoin from "./components/assessment/AssessmentJoin";
import Assessment from "./components/assessment/Assessment";
import AssessmentCreate from "./components/assessment/AssessmentCreate";
import ResultFinalize from "./components/admin/results/ResultFinalize";

const App = () => {
  return (
    <Provider store={store}>
      <div className=" position-relative h-100">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/users" component={Admin} />
            <Route exact path="/admin/user/add" component={Admin} />
            <Route exact path="/admin/user/edit" component={Admin} />
            <Route exact path="/admin/user/report" component={Admin} />
            <Route exact path="/admin/user/userId=:userId" component={Admin} />

            <Route exact path="/admin/schools" component={Admin} />
            <Route exact path="/admin/school/add" component={Admin} />
            <Route exact path="/admin/school/edit" component={Admin} />
            <Route
              exact
              path="/admin/school/schoolId=:schoolId"
              component={Admin}
            />

            <Route exact path="/admin/assessments" component={Admin} />
            <Route exact path="/admin/assessment/add" component={Admin} />
            <Route exact path="/admin/assessment/edit" component={Admin} />
            <Route
              exact
              path="/admin/assessment/assessmentId=:assessmentId/categoryId=:categoryId"
              component={Admin}
            />

            <Route exact path="/admin/classrooms" component={Admin} />
            <Route exact path="/admin/classroom/add" component={Admin} />
            <Route exact path="/admin/classroom/edit" component={Admin} />
            <Route exact path="/admin/classroom/report" component={Admin} />
            <Route
              exact
              path="/admin/classroom/classroomId=:classroomId"
              component={Admin}
            />

            <Route exact path="/admin/grades" component={Admin} />
            <Route exact path="/" component={Auth} />
            <Route exact path="/account" component={Auth} />
            <Route exact path="/account/forgot" component={Auth} />
            <Route exact path="/account/reset/:token" component={Auth} />

            <Route exact path="/assessment/join" component={AssessmentJoin} />
            <Route exact path="/assessment/add" component={AssessmentCreate} />
            <Route
              exact
              path="/assessment/finalize"
              component={ResultFinalize}
            />
            <Route exact path="/assessment/:id" component={Assessment} />
            <Route
              exact
              path="/assessment/preview/:id"
              component={Assessment}
            />
            <Route exact path="/assessment/edit/:id" component={Assessment} />

            <Route exact path="/admin/result" component={Admin} />
            <Route
              exact
              path="/admin/result/resultId=:resultId"
              component={Admin}
            />

            <Route exact path="/admin/dashboard" component={Admin} />
            <Route exact path="/admin/dashboard/compare" component={Admin} />

            {/* Reception */}
            <Route exact path="/admin/reception" component={Admin} />
            <Route exact path="/admin/reception/add" component={Admin}/>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
