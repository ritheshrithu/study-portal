import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../App.css";
import { connect } from "react-redux";
import propTypes from "prop-types";
import $ from "jquery";
var opt = ["A", "B", "C", "D"];

class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      id: "",
      quiz: [],
      time: "",
      data: false,
      resultData: "",
      button: false
    };
  }

  componentDidMount() {
    axios
      .get("/api/portal/showtech/" + this.props.match.params.id + "/showquiz")
      .then(response => {
        if (response.status === 200) {
          this.setState({
            id: response.data[0]._id,
            quiz: response.data[0].quizData,
            time: response.data[0].time,
            data: true,
            redirect: false,
            resultData: ""
          });
        } else {
          this.setState({
            id: "",
            quiz: [1],
            time: "",
            data: false,
            redirect: false
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      button: true
    });
    let correctAnswers = [];
    const { quiz } = this.state;
    this.state.quiz.map((ca, i) => {
      correctAnswers.push(ca.correctAnswers);
    });
    const form = document.querySelector(".quiz-form");
    const result = document.querySelector(".result");
    let score = 0;
    const userAnswers = [
      form.q1.value,
      form.q2.value,
      form.q3.value,
      form.q4.value,
      form.q5.value
    ];
    userAnswers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        score++;
      }
    });
    const percent = (score / this.state.quiz.length) * 100;
    const path = this.props.location.pathname;
    const spl = path.split("/");
    const topicId = spl[2];

    const resultData = {
      techId: this.props.match.params.id,
      topicId: topicId,
      totalQuestions: this.state.quiz.length,
      marksScored: score,
      marksScoredInPercent: percent,
      correctAnswers: score,
      wrongAnswers: this.state.quiz.length - score,
      userId: this.props.auth.user.id,
      userName: this.props.auth.user.name,
      project: this.props.auth.user.project,
      empId: this.props.auth.user.empid,
      dateAttended: Date()
    };
    axios
      .post(
        "/api/portal/showtech/" +
          this.props.match.params.id +
          "/calculateresult",
        resultData
      )
      .then(res => {
        if (res.status === 200) {
          this.setState({
            redirect: true,
            resultData: resultData,
            data: false
          });
        }
      })
      .catch(err => {
        console.log("failed");
      });
  }
  render() {
    const { quiz, data, redirect, resultData, button } = this.state;
    console.log(resultData);
    return redirect ? (
      <div>
        <h3>displaying scores</h3>
        <h4>
          You scored {resultData.correctAnswers} out of{" "}
          {resultData.totalQuestions}
        </h4>
      </div>
    ) : (
      <div>
        {data ? (
          <div className="container">
            <div className="row">
              <form
                className="text-dark quiz-form col-md-12"
                onSubmit={this.onSubmit}
              >
                {this.state.quiz.map((q, i) => {
                  return (
                    <div className="my-5" key={i + 1}>
                      <p className="lead font-weight-normal">
                        {i + 1} . {q.question}
                      </p>
                      <div className="form-check my-2">
                        {q.options.map((o, j) => {
                          return (
                            <div className="my-3" key={j + 1}>
                              <input
                                type="radio"
                                name={"q" + (i + 1)}
                                key={i + 1 + "," + (j + 1)}
                                value={opt[j]}
                                onClick={this.onClick}
                              />
                              <label
                                className="form-check-label"
                                key={i + 1 + "." + (j + 1)}
                              >
                                {o}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                      <hr />
                    </div>
                  );
                })}
                <div className="my-5 text-center">
                  <button class="btn btn-success" type="submit">
                    {button ? (
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="false"
                      ></span>
                    ) : (
                      <div>SUBMIT</div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="container ">
            <div className="row">
              <div className="col-md-12 alert alert-warning">
                Getting Questions...
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

QuizComponent.propTypes = {
  auth: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(QuizComponent);
