import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authSelectors } from "../auth";
import { LOGIN_URL } from "../constants";

class PrivateRoute extends Component {
  componentDidMount() {
    this.checkLogin();
  }
  componentDidUpdate(prevProps) {
    this.checkLogin();
  }
  checkLogin() {
    if (!this.props.isLoggedIn && this.props.hasHydrated) {
      this.props.history.push({
        pathname: LOGIN_URL,
        state: { prevLocation: this.props.location }
      });
    }
  }
  render() {
    if (!this.props.isLoggedIn) {
      return null;
    }
    return (
      <Route
        exact={this.props.exact}
        path={this.props.path}
        component={this.props.component}
      />
    );
  }
}

export default withRouter(
  connect(state => ({
    isLoggedIn: authSelectors.isLoggedIn(state),
    hasHydrated: authSelectors.hasHydrated
  }))(PrivateRoute)
);
