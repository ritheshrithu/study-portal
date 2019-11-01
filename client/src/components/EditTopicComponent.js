import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import "../App.css";
import { Redirect } from "react-router-dom";
export default class CreateTechComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onUploadFile = this.onUploadFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      file: "",
      filename: ""
    };
  }
  componentDidMount() {
    axios
      .get("/api/portal/showtopic/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data[0].name,
          filename: res.data[0].filename
        });
      });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onUploadFile(e) {
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const tech = {
      name: this.state.name,
      file: this.state.file,
      filename: this.state.filename
    };
    const formData = new FormData();
    formData.append("name", tech.name);
    formData.append("file", tech.file);
    formData.append("filename", tech.filename);

    axios
      .post("/api/portal/updatetopic/" + this.props.match.params.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        $(".alert-warning").removeClass("hide");
        if (res.status === 200) {
          $(".alert-success").removeClass("hide");
          $(".alert-warning").addClass("hide");
          setTimeout(function() {
            $(".alert-success").addClass("hide");
          }, 5000);
          window.scrollTo(0, 0);
          //  setTimeout(() => this.setState({ redirect: true }), 3000)
        }
      })
      .catch(err => {
        $(".alert-danger").removeClass("hide");
        $(".alert-warning").addClass("hide");
        setTimeout(function() {
          $(".alert-danger").addClass("hide");
        }, 5000);
      });

    this.setState({
      name: "",
      type: "",
      file: "",
      filename: "Upload Image"
    });
  }

  render() {
    const topic = this.state;
    return (
      <div style={{ marginTop: 50 }}>
        <div className="alert alert-success hide">
          Topic updated Successfully
        </div>
        <div className="alert alert-danger hide">Failed to update</div>
        <div className="alert alert-warning hide">updating New Topic...</div>
        <h3>Update topic</h3>
        <form onSubmit={this.onSubmit} encType="multipart/from-data">
          <div className="form-group  col-md-6">
            <label className="">Name of the Topic : </label>
            <input
              type="text"
              value={topic.name}
              className="form-control"
              onChange={this.onChangeName}
            />
          </div>

          <div className="form-group  col-md-6">
            <label>Display Icon : </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                onChange={this.onUploadFile}
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {this.state.filename}
              </label>
            </div>
          </div>

          <div className="form-group col-md-6">
            <input type="submit" value="Update" className="btn btn-success" />
          </div>
        </form>
      </div>
    );
  }
}
