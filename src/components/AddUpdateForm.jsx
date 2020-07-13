import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AddUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleAdd;
  render() {
    return <></>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  genre: state.genre,
  author: state.author,
});

export default connect(mapStateToProps)(AddUpdateForm);
