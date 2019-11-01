// IndexComponent.js

import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

class DisplayQuizResultComponent extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    axios
      .get("/api/portal/showtech/" + this.props.match.params.id + "/getresult")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return <h3>Scores will be displayed here</h3>;
  }
}

DisplayQuizResultComponent.propTypes = {
  auth: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(DisplayQuizResultComponent);
