import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../auth/selectors";
import { LOGIN_URL, LOGOUT_URL } from "../constants";

class HomePage extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return (
        <Fragment>
          <h2>Home</h2>
          <div>
            Welcome home, to logout click <Link to={LOGOUT_URL}>here</Link>.
          </div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <h2>Home</h2>
        <div>
          To login, click <Link to={LOGIN_URL}>here</Link>.
        </div>
      </Fragment>
    );
  }
}

export default connect(state => ({ isLoggedIn: isLoggedIn(state) }))(HomePage);
