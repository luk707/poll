import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { LOGIN_URL } from "../constants";

class RegisterPage extends Component {
  render() {
    return (
      <Fragment>
        <h2>Register</h2>
        Already a user? <Link to={LOGIN_URL}>Login here</Link>.
      </Fragment>
    );
  }
}

export default RegisterPage;
