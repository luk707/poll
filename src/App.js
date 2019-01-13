import React, { Component } from "react";
import { Provider as StoreProvider } from "react-redux";
import Router from "./router";
import store from "./store";
import { authActions } from "./auth";

store.dispatch(authActions.hydrate());

class App extends Component {
  render() {
    return (
      <StoreProvider store={store}>
        <Router />
      </StoreProvider>
    );
  }
}

export default App;
