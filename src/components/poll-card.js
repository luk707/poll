import React, { Component } from "react";
import { connect } from "react-redux";
import { authSelectors } from "../auth";
import { database } from "../firebase";
import { Card, Text, Box, IconButton, Icon, Touchable } from "gestalt";
import NumericLabel from "react-pretty-numbers";

class PollCard extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.data.initialValue;
  }
  componentDidMount() {
    this.pollRef = database.ref(`/polls/${this.props.data.id}`);
    this.pollRef.on("value", snapshot => {
      this.setState(snapshot.val());
      this.view();
    });
  }
  componentWillUnmount() {
    this.pollRef.off();
  }
  like = () => {
    database.ref(`/polls/${this.props.data.id}`).transaction(poll => {
      if (poll) {
        if (!poll.likes) {
          poll.likes = {};
        }
        if (!poll.likeCount) {
          poll.likeCount = 0;
        }
        if (!poll.likes[this.props.uid]) {
          poll.likeCount++;
          poll.likes[this.props.uid] = true;
        } else {
          poll.likeCount--;
          poll.likes[this.props.uid] = false;
        }
      }
      return poll;
    });
  };
  view = () => {
    database.ref(`/polls/${this.props.data.id}`).transaction(poll => {
      if (poll) {
        if (!poll.views) {
          poll.views = {};
        }
        if (!poll.viewCount) {
          poll.viewCount = 0;
        }
        if (!poll.views[this.props.uid]) {
          poll.viewCount++;
          poll.views[this.props.uid] = true;
        }
      }
      return poll;
    });
  };
  render() {
    const totalVotes = Object.keys(this.state.options).reduce(
      (acc, cur) => acc + this.state.options[cur],
      0
    );
    return (
      <Card>
        <Box padding={1}>
          <Text bold size="lg">
            {this.state.name}
          </Text>
        </Box>
        {Object.keys(this.state.options).map(option => (
          <Box padding={1} key={option}>
            <Box shape="pill" color="lightGray" height={30} position="relative">
              <Box width="100%" height="100%" position="absolute">
                <Box
                  shape="pill"
                  color="watermelon"
                  height="100%"
                  minWidth={30}
                  width={`${(totalVotes === 0
                    ? 0
                    : (this.state.options[option] / totalVotes) * 100
                  ).toFixed(2)}%`}
                />
              </Box>
              <Box
                height="100%"
                width="100%"
                position="absolute"
                display="flex"
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Text bold color="darkGray">
                  {option}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
        <Box
          padding={1}
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="start"
        >
          <Box display="flex" direction="row" alignItems="center">
            <IconButton
              accessibilityLabel="Love"
              icon="heart"
              iconColor={
                this.state.likes && this.state.likes[this.props.uid] === true
                  ? "red"
                  : "darkGray"
              }
              size="sm"
              onClick={this.like}
            />
            <Text color="gray">
              <NumericLabel
                params={{ shortFormatPrecision: 2, shortFormat: true }}
              >
                {this.state.likeCount}
              </NumericLabel>
            </Text>
            <Box padding={2}>
              <Icon
                accessibilityLabel="Views"
                icon="eye"
                color="gray"
                size={16}
              />
            </Box>
            <Text color="gray">
              <NumericLabel
                params={{ shortFormatPrecision: 2, shortFormat: true }}
              >
                {this.state.viewCount}
              </NumericLabel>
            </Text>
          </Box>
        </Box>
      </Card>
    );
  }
}

export default connect(state => ({ uid: authSelectors.uid(state) }))(PollCard);
