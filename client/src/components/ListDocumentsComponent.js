import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default class ListDocumentsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tech: "",
      data: false
    };
  }

  componentDidMount() {
    axios
      .get("/api/portal/showtech/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          tech: response.data,
          data: true
        });
      })
      .catch(function(error) {
        this.setState({
          tech: "",
          data: false
        });
      });
  }

  contextMenu(e) {
    e.preventDefault();
  }

  render() {
    const { data, tech } = this.state;
    return data ? (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h5 className="card-title text-center">{tech.name} DOCUMENTS</h5>
            <Link to={""} data-toggle="modal" data-target="#myModal">
              <div className="card col-md-3">
                <img
                  className="shadow"
                  src="/documents/pdf.png"
                  width="250px"
                  height="300px"
                  alt="Card image cap"
                />
                <div className="my-1 modal-heading">{tech.filename}</div>
              </div>
            </Link>
            <div
              className="modal fade modal-fullscreen"
              id="myModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <center>
                      <h4 className="modal-title text-center" id="myModalLabel">
                        {tech.filename}
                      </h4>
                    </center>

                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >
                      X
                    </button>
                  </div>

                  <center>
                    <div
                      className="modal-body modal-lg"
                      onContextMenu={this.contextMenu}
                    >
                      <div className="embed-responsive embed-responsive-16by9">
                        <object
                          data={`http://localhost:${process.env.PORT}/documents/${tech.filename}#toolbar=0&navpanes=0&view=Fit`}
                          type="application/pdf"
                          width="100%"
                          height="850"
                        ></object>
                      </div>
                    </div>
                  </center>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
