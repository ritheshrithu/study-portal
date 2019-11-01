import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import propTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empid: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      empid: this.state.empid,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center"></p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="number"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.empid
                    })}
                    placeholder="Employee Id"
                    name="empid"
                    value={this.state.empid}
                    onChange={this.onChange}
                  />
                  {errors.empid && (
                    <div className="invalid-feedback">{errors.empid}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
              <center>
                <br />
                <br />
                <Link to={"/signup"}>Signup</Link>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  loginUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(LoginComponent);
