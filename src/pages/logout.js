import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { authActions, authSelectors } from "../auth";
import { HOME_URL } from "../constants";

class LogoutPage extends Component {
  logout = () => {
    this.props.logout({
      onSuccess: () => {
        this.props.history.push(HOME_URL);
      }
    });
  };
  componentDidMount() {
    this.logout();
  }
  render() {
    if (this.props.pending) {
      return "Logging out...";
    }
    if (this.props.error) {
      return (
        <Fragment>
          <span style={{ color: "red" }}>{this.props.error}</span>
          <button onClick={this.logout}>Try again</button>
        </Fragment>
      );
    }
    return null;
  }
}

export default connect(
  state => ({
    pending: authSelectors.isLoggingOut,
    error: authSelectors.logoutError
  }),
  {
    logout: authActions.logout
  }
)(LogoutPage);
