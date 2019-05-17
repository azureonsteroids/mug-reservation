import React, { Component } from "react";
import API from "../utils/API";
import { Button } from "react-bootstrap";

class GoodyCard extends Component {
  constructor(props) {
    super(props);
    this.orderOne.bind(this);
  }
  orderOne = event => {
    API.orderGoody({username: "axel", goodyName: this.props.goody.name});
  };

  render() {
    return (
      <div className="home-header row">
        <div className="col-sm-10 not-centered-text">
          <p className="home-title pull-left">{this.props.goody.name}</p>
        </div>
        <div className="col-sm-2 logout-command-div">
            <Button
              onClick={this.orderOne}
              bsSize="small"
              type="submit"
            >
              Order one
            </Button>
        </div>
      </div>
    );
  }
}

export default GoodyCard;
