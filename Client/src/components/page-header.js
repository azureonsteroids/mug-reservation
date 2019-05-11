import React, { Component } from "react";
import CommandHeader from "./command-header";
import API from "../utils/API";
import { Button } from "react-bootstrap";

class PageHeader extends Component {
  constructor(props) {
    super(props);
    this.disconnect.bind(this);
  }
  disconnect = event => {
    API.logout();
    window.location = "/";
  };

  render() {
    return (
      <div className="home-header row">
        <div className="col-sm-10 not-centered-text">
          <h3 className="home-title pull-left">MUG Shop</h3>
        </div>
        <div className="col-sm-2 logout-command-div">
          <CommandHeader className="command-div"  />
            <Button
              onClick={this.disconnect}
              bsSize="small"
              bsStyle="logout" // custom css btn-logout
              type="submit"
            >
              Logout
            </Button>
        </div>
      </div>
    );
  }
}

export default PageHeader;
