// IndexComponent.js

import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import $ from "jquery";
import moment from "moment";

export default class ListTopicComponent extends Component {
  constructor(props) {
    super(props);
    this.deleteTopic = this.deleteTopic.bind(this);
    this.state = {
      topics: [],
      data: false,
      success: false
    };
  }
  componentDidMount() {
    axios
      .get("/api/portal/showtopics")
      .then(response => {
        if (response.status === 200 && response.data.length !== 0) {
          this.setState({
            topics: response.data,
            data: true,
            success: true
          });
        } else {
          this.setState({
            topics: [1],
            data: true,
            success: false
          });
        }
      })
      .catch(function(error) {
        this.setState({
          topics: [1],
          data: true,
          success: false
        });
      });
  }

  deleteTopic(topic) {
    axios
      .get("/api/portal/deletetopic/" + topic._id)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            topics: this.state.topics.filter(el => el !== topic)
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
        <h2 className="text-center">Topics</h2>
        <br />
        <div className="alert alert-danger hide">Unable to delete</div>
        <div className=" table-responsive">
          <table className="table  table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">S.NO</th>
                <th scope="col">topic NAME</th>
                <th scope="col">CREATED AT</th>
                <th scope="col">UPDATED AT</th>
                <th scope="col">ACTIONS</th>
              </tr>
            </thead>

            {success ? (
              <tbody>
                {this.state.topics.map((topic, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{topic.name}</td>
                    <td>{moment(topic.createdAt).format("llll")}</td>
                    <td>{moment(topic.updatedAt).format("llll")}</td>
                    <td>
                      <Link
                        to={`/topic/${topic._id}/edit`}
                        className="btn btn-outline-primary"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          this.deletetopic(topic);
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
      </div>
    ) : (
      <div className="container">
        <div className="jumbotron alert alert-warning">Fetching Data...</div>
      </div>
    );
  }
}
