import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import CreateTechComponent from "./CreateTechComponent";
import CreateTopicComponent from "./CreateTopicComponent";
import EditTechComponent from "./EditTechComponent";
import EditTopicComponent from "./EditTopicComponent";
import DisplayTechComponent from "./DisplayTechComponent";
import DisplayTechsComponent from "./DisplayTechsComponent";
import QuizComponent from "./QuizComponent";
import QuestionsComponent from "./QuestionsComponent";
import DisplayTopicComponent from "./DisplayTopicComponent";
import ListTopicComponent from "./ListTopicComponent";
import ListTechsComponent from "./ListTechsComponent";
import ListUsersComponent from "./ListUsersComponent";
import ListVideosComponent from "./ListVideosComponent";
import ListDocumentsComponent from "./ListDocumentsComponent";
import DisplayQuizResultComponent from "./DisplayQuizResultComponent";
import LoginComponent from "./LoginComponent";
import ListQuizResultsComponent from "./ListQuizResultsComponent";
import SignupComponent from "./SignupComponent";
import NotFoundComponent from "./NotFoundComponent";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions";
import "../../node_modules/jquery/dist/jquery.min.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

class AppNavbar extends Component {
  constructor(props) {
    super();
  }

  onlogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user, isAdmin } = this.props.auth;
    const authLinks = (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark text-white fixed-top">
        <Link className="navbar-brand" to={"/"}>
          Study Portal
        </Link>
        <button
          className="navbar-toggler navbar-toggle collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNavDropdown" className="navbar-collapse collapse">
          {isAdmin ? (
            <div>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to={"/createnewtopic"} className="nav-link">
                    New Topic
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/createnewtech"} className="nav-link">
                    New Tech
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/topics"} className="nav-link">
                    Topics
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/technologies"} className="nav-link">
                    Technologies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/users"} className="nav-link">
                    Users
                  </Link>
                </li>
                <li className="nav-item mr-auto">
                  <Link to={`/${user.id}/quizResults`} className="nav-link">
                    {user.name}
                  </Link>
                </li>
                <li className="nav-item navbar-left">
                  <Link
                    to="/"
                    onClick={this.onlogoutClick.bind(this)}
                    className="nav-link"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item navbar-left">
                <Link to={`/${user.id}/quizResults`} className="nav-link">
                  {user.name}
                </Link>
              </li>
              <li className="nav-item navbar-left">
                <Link
                  to="/"
                  onClick={this.onlogoutClick.bind(this)}
                  className="nav-link"
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );

    const guestLinks = (
      <Link to={"/"} className="navbar-brand text-white">
        STUDY PORTAL
      </Link>
    );
    return (
      <Router>
        {isAuthenticated ? authLinks : guestLinks}
        <br />
        <br />
        <div className="container" style={{ marginTop: 50 }}>
          {isAuthenticated ? (
            <div>
              <Redirect to={"/"} />
              {isAdmin ? (
                <Switch>
                  <Route
                    exact
                    path="/createnewtech"
                    component={CreateTechComponent}
                  />
                  <Route
                    exact
                    path="/createnewtopic"
                    component={CreateTopicComponent}
                  />
                  <Route
                    exact
                    path="/topic/:id/edit"
                    component={EditTopicComponent}
                  />
                  <Route
                    exact
                    path="/topic/:id/technologies"
                    component={DisplayTechsComponent}
                  />
                  <Route
                    exact
                    path="/topic/:id/technologies/:id"
                    component={DisplayTechComponent}
                  />
                  <Route
                    exact
                    path="/topic/:id/technologies/:id/quiz"
                    component={QuizComponent}
                  />
                  <Route
                    exact
                    path="/topic/:id/technologies/:id/addquiz"
                    component={QuestionsComponent}
                  />
                  <Route
                    exact
                    path="/technologies"
                    component={ListTechsComponent}
                  />
                  <Route exact path="/users" component={ListUsersComponent} />
                  <Route exact path="/topics" component={ListTopicComponent} />
                  <Route
                    exact
                    path="/topic/:id/technologies/:id/edit"
                    component={EditTechComponent}
                  />
                  <Route
                    exact
                    path="/topic/:id/technologies/:id/videos"
                    component={ListVideosComponent}
                  />
                  <Route
                    exact
                    path="/topic/:id/technologies/:id/documents"
                    component={ListDocumentsComponent}
                  />
                  <Route exact path="/" component={DisplayTopicComponent} />
                  <Route
                    exact
                    path="/topic/:id/technologies/:id/quizresult"
                    component={DisplayQuizResultComponent}
                  />
                  <Route
                    exact
                    path="/:id/quizresults"
                    component={ListQuizResultsComponent}
                  />
                  <Route path="*" component={NotFoundComponent} />
                </Switch>
              ) : (
                <Switch>
                  <Route exact path="/" component={DisplayTopicComponent} />
                  <Route
                    exact
                    path="/topic/:id/technologies"
                    component={DisplayTechsComponent}
                  />
                  <Route
                    exact
                    path="/topic/:id/technologies/:id"
                    component={DisplayTechComponent}
                  />
                  <Route
                    exact
                    path="/topic/:id/technologies/:id/videos"
                    component={ListVideosComponent}
                  />
                  <Route
                    exact
                    path="/topic/:id/technologies/:id/documents"
                    component={ListDocumentsComponent}
                  />
                  <Route
                    exact
                    path="/topic/:id/technologies/:id/quiz"
                    component={QuizComponent}
                  />
                  <Route
                    exact
                    path="/topic/:id/technologies/:id/quizresult"
                    component={DisplayQuizResultComponent}
                  />
                  <Route
                    exact
                    path="/:id/quizresults"
                    component={ListQuizResultsComponent}
                  />
                  <Route path="*" component={NotFoundComponent} />
                </Switch>
              )}
            </div>
          ) : (
            <Switch>
              <Route exact path="/" component={LoginComponent} />
              <Route exact path="/signup" component={SignupComponent} />
              <Redirect to={"/"} />
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}
AppNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(AppNavbar);
