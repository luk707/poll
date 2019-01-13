import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { HOME_URL } from "../constants";

class NotFoundPage extends Component {
  render() {
    return (
      <Fragment>
        <h2>404</h2>
        <p>Page not found</p>
        <p>
          Click <Link to={HOME_URL}>here</Link> to go home.
        </p>
      </Fragment>
    );
  }
}

export default NotFoundPage;
