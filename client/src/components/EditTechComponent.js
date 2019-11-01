import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import "../App.css";
import { Redirect } from "react-router-dom";
export default class EditTechComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeTopic = this.onChangeTopic.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeYoutubeLink = this.onChangeYoutubeLink.bind(this);
    this.onChangeOfficialDoc = this.onChangeOfficialDoc.bind(this);
    this.onUploadFile = this.onUploadFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      description: "",
      topic: "",
      officialdoc: "",
      youtubelink: "",
      file: "",
      filename: "Choose file",
      data: false,
      topics: []
    };
  }
  componentDidMount() {
    axios
      .get("/api/portal/showtech/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          description: response.data.name,
          topic: response.data.topic,
          officialdoc: response.data.officialdoc,
          youtubelink: response.data.youtubelink,
          filename: response.data.filename,
          data: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    axios.get("/api/portal/showtopics").then(data => {
      this.setState({
        topics: ["", ...data.data]
      });
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeTopic(e) {
    this.setState({
      topic: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeYoutubeLink(e) {
    this.setState({
      youtubelink: e.target.value
    });
  }
  onChangeOfficialDoc(e) {
    this.setState({
      officialdoc: e.target.value
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
      topic: this.state.topic,
      description: this.state.description,
      youtubelink: this.state.youtubelink,
      officialdoc: this.state.officialdoc,
      file: this.state.file,
      filename: this.state.filename
    };

    const formData = new FormData();
    formData.append("name", tech.name);
    formData.append("topic", tech.topic);
    formData.append("description", tech.description);
    formData.append("youtubelink", tech.youtubelink);
    formData.append("officialdoc", tech.officialdoc);
    formData.append("file", tech.file);
    formData.append("filename", tech.filename);

    axios
      .post("/api/portal/updatetech/" + this.props.match.params.id, formData, {
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
      description: "",
      topic: "",
      officialdoc: "",
      youtubelink: "",
      file: "",
      filename: "",
      data: false
    });
  }

  render() {
    const topics = this.state;
    return (
      <div style={{ marginTop: 50 }}>
        <div className="alert alert-success hide">
          Technology updated Successfully
        </div>
        <div className="alert alert-danger hide">Failed to update</div>
        <div className="alert alert-warning hide">
          Updating New Technology...
        </div>
        <h3>Edit Technology</h3>
        <form onSubmit={this.onSubmit} encType="multipart/from-data">
          <div className="form-group  col-md-6">
            <label className="">Name of the Technology : </label>
            <input
              type="text"
              value={this.state.name}
              className="form-control"
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group  col-md-6">
            <label> Description : </label>
            <textarea
              type="text-area"
              value={this.state.description}
              className="form-control"
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group  col-md-6">
            <label className="">Topic : </label>
            <select
              value={this.state.topic}
              className="form-control"
              onChange={this.onChangeTopic}
            >
              {this.state.topics.map((topic, i) => (
                <option className="form-control" value={topic.name} key={i}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group  col-md-6">
            <label className="">Official Documentation : </label>
            <input
              type="text"
              value={this.state.officialdoc}
              className="form-control"
              onChange={this.onChangeOfficialDoc}
            />
          </div>
          <div className="form-group  col-md-6">
            <label>Youtube Link : </label>
            <input
              type="text"
              value={this.state.youtubelink}
              className="form-control"
              onChange={this.onChangeYoutubeLink}
            />
          </div>

          <div className="form-group  col-md-6">
            <label>Documents : </label>
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
