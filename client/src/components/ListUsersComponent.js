import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";

class ListUsersComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      data: false,
      success: false
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/users");
    }
    axios
      .get("/api/users/getusers")
      .then(response => {
        if (response.status === 200 && response.data.length !== 0) {
          this.setState({
            users: response.data,
            data: true,
            success: true
          });
        } else {
          this.setState({
            users: [1],
            data: true,
            success: true
          });
        }
      })
      .catch(function(error) {
        this.setState({
          users: [1],
          data: true,
          success: false
        });
      });
  }
  render() {
    const { data, success, users } = this.state;
    return data ? (
      <div className="container">
        <h2 className="text-center">Users</h2>
        <br />
        <div className="alert alert-danger hide">Unable to delete</div>
        <div className=" table-responsive">
          <table className="table  table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">
                  <center>S.NO</center>
                </th>
                <th scope="col">
                  <center>NAME</center>
                </th>
                <th scope="col">
                  <center>EMAIL ID</center>
                </th>
                <th scope="col">
                  <center>EMPLOYEE ID</center>
                </th>
                <th scope="col">
                  <center>ROLE</center>
                </th>
                <th scope="col">
                  <center>PROJECT</center>
                </th>
                <th scope="col">
                  <center>ACTIONS</center>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user, i) => (
                <tr key={i}>
                  <th scope="row">
                    <center>{i + 1}</center>
                  </th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.empid}</td>
                  <td>{user.role}</td>
                  <td>{user.project}</td>
                  <td>
                    <Link
                      to={`/user/${user._id}/edit`}
                      className="btn btn-outline-primary"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
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

ListUsersComponent.propTypes = {
  auth: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(ListUsersComponent);
