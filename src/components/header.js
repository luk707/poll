import React, { Component } from "react";
import { Box, Avatar, Text, Button, SearchField, IconButton } from "gestalt";
import { withRouter } from "react-router-dom";
import { HOME_URL, CREATE_POLL_URL } from "../constants";
import PillButton from "./pill-button";

class Header extends Component {
  render() {
    return (
      <Box
        alignItems="center"
        direction="row"
        display="flex"
        height={65}
        marginStart={4}
        marginEnd={4}
      >
        <IconButton
          accessibilityLabel="Poll"
          bgColor="white"
          icon="graph-bar"
          iconColor="red"
          size="lg"
          onClick={() => this.props.history.push(HOME_URL)}
        />
        <Box paddingX={3} flex="grow">
          <SearchField
            accessibilityLabel="Demo Search Field"
            id="searchField"
            // onChange={({ value }) => this.setState({ value })}
            placeholder="Search and explore"
            value=""
          />
        </Box>
        <PillButton>
          <Text bold size="md">
            Home
          </Text>
        </PillButton>
        <PillButton paddingX={2}>
          <Avatar name="luke" size="sm" />
          <Box paddingX={2}>
            <Text bold size="md">
              Luke Harris
            </Text>
          </Box>
        </PillButton>
        <IconButton
          accessibilityLabel="New poll"
          icon="add"
          iconColor="red"
          size="lg"
          onClick={() => this.props.history.push(CREATE_POLL_URL)}
        />
      </Box>
    );
  }
}

export default withRouter(Header);
