import React, { Component } from "react";
import API from "../utils/API";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

class GoodyCard extends Component {
    constructor(props) {
        super(props);
        this.orderOne.bind(this);
    }
    orderOne = event => {
        API.orderGoody({ username: "axel", goodyName: this.props.goody.name });
    };

    render() {
        return (
            <div className="col-lg-4" >
            <div className="custom-card goody-card">
                <Card >
                    <Card.Body>
                        <Card.Title>{this.props.goody.name}</Card.Title>
                        <Card.Text>
                            <div className="goody-description">
                                {this.props.goody.description}
                            </div>
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>{this.props.goody.price.$numberDecimal} €</ListGroupItem>
                        </ListGroup>  
                        <Button onClick={this.orderOne} variant="primary">Order one</Button>
                    </Card.Body>
                </Card>
                </div>
            </div>
        );
    }
}

export default GoodyCard;
