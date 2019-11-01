import React, { Component } from "react";
import axios from "axios";

export default class ListVideosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      data: false
    };
  }

  componentDidMount() {
    axios
      .get("/api/portal/showtech/" + this.props.match.params.id)
      .then(response => {
        var a1 = response.data.youtubelink.split("/");
        var a2 = a1[a1.length - 1];
        var a3 = a2.split("=");
        if (response.data.youtubelink.match(/user/g)) {
          var link = this.state.videos.concat(
            "https://www.youtube.com/embed/?listType=user_uploads&list=" + a3
          );
          this.setState({
            videos: link,
            data: true
          });
        } else if (response.data.youtubelink.match(/list/g)) {
          var link = this.state.videos.concat(
            "https://www.youtube.com/embed/videoseries?list=" + a3
          );
          this.setState({
            videos: link,
            data: true
          });
        } else {
          var link = this.state.videos.concat(
            "https://www.youtube.com/embed/" + a3
          );
          this.setState({
            videos: link,
            data: true
          });
        }
      })

      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { data, videos } = this.state;
    return data ? (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5 className="card-title text-center">{videos.name}</h5>
          </div>
          {videos.map((video, i) => (
            <div className="col-md-4" key={i}>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src={video}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="container">
        <div className="jumbotron alert alert-warning">Fetching Data...</div>
      </div>
    );
  }
}
