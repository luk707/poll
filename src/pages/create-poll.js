import React, { Component, Fragment } from "react";
import { Divider, Box } from "gestalt";
import { connect } from "react-redux";
import Header from "../components/header";
import CreatePollForm from "../components/create-poll-form";
import { database } from "../firebase";
import { authSelectors } from "../auth";
import { HOME_URL } from "../constants";

class CreatePollPage extends Component {
  handleSubmit = ({ name, options }) => {
    const pollRef = database.ref("/polls").push();
    pollRef
      .set({
        name,
        options: options.reduce((acc, cur) => ({ ...acc, [cur]: 0 }), {}),
        owner: this.props.uid,
        likeCount: 0,
        viewCount: 0,
        voteCount: 0
      })
      .then(() => {
        // TODO: this should push to the poll detail url, not the home
        this.props.history.push(HOME_URL);
      });
  };
  render() {
    return (
      <Fragment>
        <Header />
        <Divider />
        <Box
          padding={4}
          color="lightGray"
          display="flex"
          direction="row"
          justifyContent="center"
        >
          <Box paddingX={4} shape="rounded" color="white" width={670}>
            <CreatePollForm onSubmit={this.handleSubmit} />
          </Box>
        </Box>
      </Fragment>
    );
  }
}

export default connect(state => ({ uid: authSelectors.uid(state) }))(
  CreatePollPage
);
