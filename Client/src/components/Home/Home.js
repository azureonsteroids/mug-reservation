import React from "react";
import PageHeader from "../page-header";
import PagePart from "../page-part";
import GoodyCard from "../goody-card";
import EventCard from "../event-card";

import API from "../../utils/API";
import { CardDeck } from "react-bootstrap";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      goodies: []
    }
    this.disconnect.bind(this);
    this.retriveData();
  }

  retriveData = () => {
    API.retriveGoodies().then((goodies) => {
      const currentState = this.state;
      currentState.goodies = goodies.data;
      this.setState(currentState);
    });

    API.retrieveEvents().then((events) => {
      const currentState = this.state;
      currentState.events = events.data;
      this.setState(currentState);
    })
  };

  disconnect = event => {
    API.logout();
    window.location = "/";
  };

  _renderGoodies(goody, index) {
    return <GoodyCard goody={goody}></GoodyCard>
  }

  _renderEvents(event, index) {
    console.log("event", event);
    return <EventCard event={event}></EventCard>
  }

  render() {
    const { goodies, events } = this.state;

    return (
      <div>
        <PageHeader />
        <div className="row">
          <div className="col-sm-7 goodies-part">
          <CardDeck>

            <PagePart title="MUG Goodies" >
              {
                goodies ?
                goodies.map(this._renderGoodies)
                :
                "no data to display"
              }
            </PagePart>
              </CardDeck>
          </div>
          <div className="col-sm-5 events-part" >
            <PagePart title="MUG Events">
              {
                events ?
                  events.map(this._renderEvents)
                  :
                  "no data to display"
              }
            </PagePart>
          </div>
        </div>
      </div>
    );
  }
}
