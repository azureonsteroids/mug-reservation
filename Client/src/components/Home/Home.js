import React from "react";
import { Button } from "react-bootstrap";

import PageHeader from "../page-header";
import PagePart from "../page-part";
import GoodyCard from "../goody-card";

import API from "../../utils/API";

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
    return <li key={index}>{event.name} - {event.date}</li>
  }

  render() {
    const { goodies, events } = this.state;

    return (
      <div>
        <PageHeader />
        <div className="row">
          <div className="col-sm-5 goodies-part">
            <PagePart title="MUG Goodies" >
              {
                goodies ?
                  goodies.map(this._renderGoodies)
                  :
                  "no data to display"
              }
            </PagePart>
          </div>
          <div className="col-sm-7 events-part" >
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
