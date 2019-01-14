import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../auth/selectors";
import {
  LOGIN_URL,
  LOGOUT_URL,
  ACCOUNT_URL,
  CREATE_POLL_URL
} from "../constants";
import Header from "../components/header";
import PollCard from "../components/poll-card";
import { Divider, Masonry, Box } from "gestalt";
import { database } from "../firebase";

class HomePage extends Component {
  state = {
    loading: false,
    sort: "likeCount",
    pollIds: [],
    polls: {},
    error: null
  };
  componentDidMount() {
    this.getPolls();
  }
  getPolls = () => {
    this.setState({ loading: true, error: null });
    database
      .ref("/polls")
      .orderByChild(this.state.sort)
      .limitToFirst(20)
      .once("value")
      .then(snapshot => {
        const val = snapshot.val();
        this.setState({
          loading: false,
          pollIds: Object.keys(val),
          polls: val
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error.message || "Unknown error occured"
        });
      });
  };
  render() {
    if (this.props.isLoggedIn) {
      return (
        <Fragment>
          <Header />
          <Divider />
          <Box paddingY={4}>
            <Masonry
              comp={PollCard}
              items={this.state.pollIds.map(pollId => ({
                id: pollId,
                initialValue: this.state.polls[pollId]
              }))}
              // loadItems={t}
              minCols={2}
            />
          </Box>
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
