import React, { Component } from "react";

class CommandHeader extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <i className="glyphicon glyphicon-calendar"></i>
        <a className="command-number">12</a>
      </div>
    );
  }
}

export default CommandHeader;
