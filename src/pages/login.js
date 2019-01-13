import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authSelectors, authActions } from "../auth";
import { REGISTER_URL, HOME_URL } from "../constants";

class LoginPage extends Component {
  state = {
    email: "",
    password: ""
  };
  componentWillUnmount() {
    this.props.clear();
  }
  handleSubmit = e => {
    e.preventDefault();
    // Login with email and password from state
    this.props.login(this.state.email, this.state.password, {
      onSuccess: () => {
        if (
          this.props.location.state &&
          this.props.location.state.prevLocation
        ) {
          this.props.history.push(this.props.location.state.prevLocation);
          return;
        }
        this.props.history.push(HOME_URL);
      }
    });
  };
  handleChange = field => e => {
    this.setState({ [field]: e.target.value });
  };
  render() {
    return (
      <Fragment>
        <h2>Login</h2>
        {this.props.error && (
          <span style={{ color: "red" }}>{this.props.error}</span>
        )}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange("email")}
          />
          <br />
          <label htmlFor="email">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange("password")}
          />
          <br />
          {this.props.isLoggingIn ? "Logging in..." : <input type="submit" />}
        </form>
        Not a user? <Link to={REGISTER_URL}>Register now</Link>.
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    isLoggingIn: authSelectors.isLoggingIn(state),
    error: authSelectors.loginError(state)
  }),
  {
    login: authActions.login,
    clear: authActions.clearLogin
  }
)(LoginPage);
