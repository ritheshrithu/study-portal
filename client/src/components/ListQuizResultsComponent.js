// IndexComponent.js

import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import $ from "jquery";
import moment from "moment";

export default class ListQuizResultsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      data: false,
      success: false,
      paginate: {
        currentPage: 1,
        pages: [],
        currentData: []
      }
    };
  }
  componentDidMount() {
    axios
      .get("/api/portal/showtech/" + this.props.match.params.id + "/getresults")
      .then(response => {
        if (response.status === 200 && response.data.length !== 0) {
          this.setState({
            results: response.data,
            data: true,
            success: true
          });
        } else {
          this.setState({
            results: [1],
            data: true,
            success: false
          });
        }
      })
      .catch(function(error) {
        this.setState({
          results: [1],
          data: true,
          success: false
        });
      });
  }

  render() {
    const { data, success, results } = this.state;
    return data ? (
      <div className="container">
        <h2 className="text-center">Quiz Results</h2>
        <br />
        <div className="alert alert-danger hide">Unable to delete</div>
        <div className=" table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="text-center">
              <tr>
                <th scope="col">QUIZ NO</th>
                <th scope="col">TOPIC NAME</th>
                <th scope="col">TECH NAME</th>
                <th scope="col">MARKS SCORED</th>
                <th scope="col">MARKS SCORED IN %</th>
                <th scope="col">DATE ATTENDED</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {success ? (
                <div>
                  {results.map((result, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{result.topicName}</td>
                      <td>{result.techName}</td>
                      <td>
                        {result.marksScored} / {result.totalQuestions}
                      </td>
                      <td>{result.marksScoredInPercent} %</td>
                      <td>{moment(result.dateAttended).format("llll")}</td>
                    </tr>
                  ))}
                </div>
              ) : (
                <tr className="text-center">
                  <td colSpan="6" scope="row">
                    No Records found...
                  </td>
                </tr>
              )}
            </tbody>
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

var paginate = (pageNumber, currentPage) => {
  currentPage = pageNumber;
};
