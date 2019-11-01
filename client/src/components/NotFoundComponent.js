import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import "../App.css";
import { Redirect } from "react-router-dom";
export default class NotFoundComponent extends Component {
  render() {
    const topics = this.state;
    return (
      <div style={{ marginTop: 50 }}>
        <h3>Page Not Found</h3>
      </div>
    );
  }
}
