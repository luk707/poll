import React, { Component } from "react";
import { connect } from "react-redux";
import { authSelectors } from "./auth";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  ACCOUNT_URL,
  ADMIN_URL,
  HOME_URL,
  LOGIN_URL,
  LOGOUT_URL,
  REGISTER_URL,
  RESET_PASSWORD_URL
} from "./constants";

import PrivateRoute from "./components/private-route";

import AccountPage from "./pages/account";
import AdminPage from "./pages/account";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import LogoutPage from "./pages/logout";
import RegisterPage from "./pages/register";
import ResetPasswordPage from "./pages/reset-password";

import NotFoundPage from "./pages/not-found";

class Router extends Component {
  render() {
    if (!this.props.hasHydrated) {
      return "Loading...";
    }
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path={ACCOUNT_URL} component={AccountPage} />
          <PrivateRoute path={ADMIN_URL} component={AdminPage} />
          <Route exact path={HOME_URL} component={HomePage} />
          <Route path={LOGIN_URL} component={LoginPage} />
          <Route path={LOGOUT_URL} component={LogoutPage} />
          <Route path={REGISTER_URL} component={RegisterPage} />
          <PrivateRoute
            path={RESET_PASSWORD_URL}
            component={ResetPasswordPage}
          />

          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(state => ({
  hasHydrated: authSelectors.hasHydrated(state)
}))(Router);
