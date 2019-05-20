import React, { Component } from "react";
import API from "../utils/API";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

class EventCard extends Component {
  constructor(props) {
    super(props);
    this.registerOne.bind(this);
  }
  registerOne = event => {
    API.registerEvent({username: localStorage.getItem("username"), eventname: this.props.event.name});
  };

  render() {
    function createMarkup(event) {
        return {__html: event.description};
      }
    const eventdate = new Date(this.props.event.eventDate);
    return (
        <div className="col-lg-12" >
        <div className="custom-card goody-card">
            <Card >
                <Card.Body>
                    <Card.Title>{this.props.event.name}</Card.Title>
                    <Card.Text>
                        <div dangerouslySetInnerHTML={createMarkup(this.props.event)}></div>
                    </Card.Text>
                    <Card.Footer> 
                    <p>
                        Event date: 
                        <b className="event-date">{eventdate.toLocaleDateString()}</b>
                    </p>
                    <Button onClick={this.registerOne} variant="primary">Register one</Button>
                    </Card.Footer>
                </Card.Body>
            </Card>
            </div>
        </div>
    );
  }
}

export default EventCard;
