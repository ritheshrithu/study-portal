// IndexComponent.js

import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import $ from "jquery";
import moment from "moment";
export default class ListTechsComponent extends Component {
  constructor(props) {
    super(props);
    this.deleteTech = this.deleteTech.bind(this);
    this.state = {
      techs: [],
      data: false,
      success: ""
    };
  }
  componentDidMount() {
    axios
      .get("/api/portal/showtechs")
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

  deleteTech(tech) {
    axios
      .get("/api/portal/deletetech/" + tech._id)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            techs: this.state.techs.filter(el => el !== tech)
          });
        } else {
          setTimeout(() => {
            $(".alert-danger").removeClass("hide");
          }, 5000);
        }
      })
      .catch(function(error) {
        setTimeout(() => {
          $(".alert-danger").removeClass("hide");
        }, 5000);
      });
  }

  render() {
    const { data, success } = this.state;
    return data ? (
      <div className="container">
        <h2 className="text-center">Technologies</h2>
        <br />
        <div className="alert alert-danger hide">Unable to delete</div>
        <table className="table  table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">S.NO</th>
              <th scope="col">TECH NAME</th>
              <th scope="col">TOPIC MAPPED</th>
              <th scope="col">CREATED AT</th>
              <th scope="col">UPDATED AT</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>

          {success ? (
            <tbody>
              {this.state.techs.map((tech, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{tech.name}</td>
                  <td>{tech.topic}</td>
                  <td>{moment(tech.createdAt).format("llll")}</td>
                  <td>{moment(tech.updatedAt).format("llll")}</td>
                  <td>
                    <Link
                      to={`/topic/${tech.topicid}/technologies/${tech._id}/edit`}
                      className="btn btn-outline-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        this.deleteTech(tech);
                      }}
                      key={i}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr className="text-center">
                <td colSpan="6" scope="row">
                  No Records found...
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    ) : (
      <div className="container">
        <div className="jumbotron alert alert-warning">Fetching Data...</div>
      </div>
    );
  }
}
