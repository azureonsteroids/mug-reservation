import React from "react";
import { Button } from "react-bootstrap";

import PageHeader from "../page-header";
import PagePart from "../page-part";

import API from "../../utils/API";

export class Home extends React.Component {
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
      <div>
        <PageHeader />
        <div className="row">
          <div className="col-sm-5 goodies-part">
            <PagePart title="MUG Goodies">
              <div>1ere element</div>
            </PagePart>
          </div>
          <div className="col-sm-7 events-part">
            <PagePart title="MUG Events">
              <div>premiere element</div>
            </PagePart>
          </div>
        </div>
      </div>
    );
  }
}
