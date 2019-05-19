import React, { Component } from "react";
import API from "../utils/API";
import { Button } from "react-bootstrap";

class CommandHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderedGoodies: {},
      registeredEvents: {},
      show: false
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.retriveData();
    setInterval(this.retriveData, 2000);
  }

  retriveData = () => {
    API.retriveOrderedGoodies().then((orderedGoodies) => {
      const currentState = this.state;
      currentState.orderedGoodies = orderedGoodies.data;
      this.setState(currentState);
    });

    API.retrieveRegisteredEvents().then((registeredEvents) => {
      const currentState = this.state;
      currentState.registeredEvents = registeredEvents.data;
      this.setState(currentState);
    })
  };

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { orderedGoodies, registeredEvents } = this.state;
    const pendingGoodies = orderedGoodies.pendingGoodies ? orderedGoodies.pendingGoodies.length : "";
    const confirmedGoodies = orderedGoodies.confirmedGoodies ? orderedGoodies.confirmedGoodies.length : "";
    const pendingEvents = registeredEvents.pendingEvents ? registeredEvents.pendingEvents.length : "";
    const confirmedEvents = registeredEvents.confirmedEvents ? registeredEvents.confirmedEvents.length : "";
    const goodiesMessage = pendingGoodies == "" ? confirmedGoodies + "ordered" : confirmedGoodies + " confirmed on " + (pendingGoodies + confirmedGoodies) + " ordered";
    const eventsMessage = pendingEvents == "" ? confirmedEvents + " registered" : confirmedEvents + " confirmed on " + (pendingEvents + confirmedEvents) + " registered";
    return (
      <div className={this.props.className}>
          <div className="command-header">
            <div className="command-number"><b>Events:</b> {eventsMessage}</div>
            <div className="command-number"><b>Goodies:</b> {goodiesMessage}</div>
          </div>
        
      </div>
    );
  }
}

export default CommandHeader;
