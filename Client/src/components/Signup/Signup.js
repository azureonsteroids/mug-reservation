import React from "react";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import API from "../../utils/API";

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      cpassword: ""
    };
    this.handleChange.bind(this);
    this.send.bind(this);
    this.redirect.bind(this);
  }
  redirect = event => {
    window.location = "/";
  };
  send = event => {
    if (this.state.username.length === 0) {
      return;
    }
    if (
      this.state.password.length === 0 ||
      this.state.password !== this.state.cpassword
    ) {
      return;
    }
    var _send = {
      username: this.state.username,
      password: this.state.password
    };
    API.signup(_send).then(
      function(data) {
        localStorage.setItem("token", data.data.token);
        window.location = "/home";
      },
      function(error) {
        console.log(error);
        return;
      }
    );
  };
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    return (
      <div className="Login">
        <FormGroup controlId="username" bsSize="large">
          <FormLabel >Username</FormLabel >
          <FormControl
            autoFocus
            value={this.state.username}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel >Password</FormLabel >
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="cpassword" bsSize="large">
          <FormLabel >Confirm Password</FormLabel >
          <FormControl
            value={this.state.cpassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button onClick={this.send} block bsSize="large" type="submit">
          Inscription
        </Button>
        <Button onClick={this.redirect} block bsSize="large" type="submit">
          Login
        </Button>
      </div>
    );
  }
}
