import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";
//import { getTechData } from "../actions/techDataActions";
import propTypes from "prop-types";
import { connect } from "react-redux";

class DisplayTechComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tech: "",
      data: false
    };
  }

  componentDidMount() {
    //this.props.getTechData(this.props.match.params.id);
    axios
      .get("/api/portal/showtech/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          tech: response.data,
          data: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    const { data, tech } = this.state;
    const { isAuthenticated, user, isAdmin } = this.props.auth;
    //const { data, tech } = this.props.techData;
    return data ? (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5 className="card-title">{tech.name}</h5>
            <p className="card-text">{tech.description}</p>
            <Link
              to={`/topic/${tech.topicid}/technologies/${tech._id}/documents`}
            >
              Documents
            </Link>
            <br />
            <a href={`${tech.officialdoc}`} target="_blank">
              Official Page
            </a>
            <br />
            <Link to={`/topic/${tech.topicid}/technologies/${tech._id}/videos`}>
              Video Tutorials
            </Link>
            <br />
            {isAdmin ? (
              <Link
                to={`/topic/${tech.topicid}/technologies/${tech._id}/addquiz`}
              >
                Add Questions
              </Link>
            ) : (
              <Link to={`/topic/${tech.topicid}/technologies/${tech._id}/quiz`}>
                Take Quiz
              </Link>
            )}
          </div>
        </div>
      </div>
    ) : (
      <div className="container">
        <div className="jumbotron alert alert-warning">Fetching Data...</div>
      </div>
    );
  }
}

DisplayTechComponent.propTypes = {
  auth: propTypes.object.isRequired
  //getTechData: propTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
  //techData: state.techData
});
export default connect(
  mapStateToProps
  //{ getTechData }
)(DisplayTechComponent);
