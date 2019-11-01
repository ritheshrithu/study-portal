// IndexComponent.js

import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import { getTechs } from "../actions/techActions";
import { connect } from "react-redux";
import propTypes from "prop-types";
class DisplayTechsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      techs: [],
      data: false,
      success: ""
    };
  }
  componentDidMount() {
    //this.props.getTechs(this.props.match.params.id);
    axios
      .get("/api/portal/getbytopic/" + this.props.match.params.id)
      .then(response => {
        if (response.status === 200 && response.data.length !== 0) {
          this.setState({
            techs: response.data,
            data: true,
            success: true
          });
        } else {
          this.setState({
            techs: [1],
            data: true,
            success: false
          });
        }
      })
      .catch(function(error) {
        this.setState({
          techs: [1],
          data: true,
          success: false
        });
      });
  }

  render() {
    //const { data, success } = this.props.techs;
    //const { techs } = this.props.techs;
    const { data, success, techs } = this.state;
    return data ? (
      <div className="container">
        <div className="row">
          {techs.map((tech, i) => {
            return success ? (
              <div
                className="col-md-4 col-sm-6 col-lg-3 col-xs-6 d-flex align-items-stretch"
                key={i}
              >
                <Link
                  to={`/topic/${tech.topicid}/technologies/${tech._id}`}
                  className="d-flex align-items-lg-stretch align-items-md-stretch text-dark btn"
                >
                  <div className="card shadow " key={i} id="box">
                    <img
                      className="card-img-top"
                      width="250px"
                      hight="250px"
                      src="https://i.udemycdn.com/course/240x135/437398_46c3_9.jpg"
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title" key={"n" + i}>
                        {tech.name}
                      </h5>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <h3 key={i}>Not Available</h3>
            );
          })}
        </div>
      </div>
    ) : (
      <div className="container">
        <div className="jumbotron alert alert-warning">Fetching Data...</div>
      </div>
    );
  }
}

DisplayTechsComponent.propTypes = {
  auth: propTypes.object.isRequired
  //  getTechs: propTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
  //techs: state.techs
});
export default connect(
  mapStateToProps
  //{ getTechs }
)(DisplayTechsComponent);
