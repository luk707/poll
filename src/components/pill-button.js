import React, { Component } from "react";
import { Box, Touchable } from "gestalt";

class PillButton extends Component {
  state = { hovered: false };
  handleMouseEnter = () => this.setState(() => ({ hovered: true }));
  handleMouseLeave = () => this.setState(() => ({ hovered: false }));
  render() {
    return (
      <Box>
        <Touchable shape="pill" display="flex" onTouch={this.props.onClick}>
          <Box
            paddingX={this.props.paddingX || 4}
            color={this.state.hovered ? "lightGray" : "transparent"}
            shape="pill"
            height={40}
            alignItems="center"
            display="flex"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            {this.props.children}
          </Box>
        </Touchable>
      </Box>
    );
  }
}

export default PillButton;
