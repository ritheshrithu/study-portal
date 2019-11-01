// IndexComponent.js

import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getTopics, setTopics } from "../actions/topicActions";
import propTypes from "prop-types";
class DisplayTopicComponent extends Component {
  static propTypes = {
    getTopics: propTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      data: false,
      success: false
    };
  }
  componentDidMount() {
    this.props.getTopics();
  }

  render() {
    const { isAdmin, project } = this.props.auth;
    const { topics, data, success } = this.props.topics;
    return data ? (
      <div className="container">
        <div className="row">
          {topics.map((topic, i) => (
            <div
              className="col-md-4 col-sm-6 col-lg-4 col-xs-3"
              key={i}
              id="box"
            >
              <Link to={`topic/${topic._id}/technologies/`}>
                <div className="card" key={i}>
                  <img
                    className="card-img-top shadow"
                    src={"documents/" + topic.filename}
                    width="300px"
                    height="150px"
                    alt="Card image cap"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="vhcenter">
        <div
          className="spinner-border"
          style={{ color: "green", width: "5rem", height: "5rem", top: "50%" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

DisplayTopicComponent.propTypes = {
  auth: propTypes.object.isRequired,
  getTopics: propTypes.func.isRequired
  //  setTopics: propTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  topics: state.topics
});
export default connect(
  mapStateToProps,
  { getTopics }
)(DisplayTopicComponent);
