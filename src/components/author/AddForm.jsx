import React, { Component } from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";
import { postAddAuthor } from "../../redux/actions/author";
import { connect } from "react-redux";
import Swal from "sweetalert2";

class AddForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }
  handleAddAuthor = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
    };
    const token = this.props.auth.data.token;
    this.props.dispatch(postAddAuthor(data, token)).then((res) => {
      Swal.fire(
        "Insert Book Success!",
        `With id = ${res.value.data.data.id}`,
        "success"
      )
        .then(() => {
          this.props.history.push("/author");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err,
          });
        });
    });
  };

  render() {
    return (
      <main className="content mb-5 mt-4">
        <Row>
          <Col md={10}>
            <Card>
              <CardHeader>Add Author</CardHeader>
              <CardBody>
                <Form onSubmit={this.handleAddAuthor}>
                  <FormGroup>
                    <Label for="name">Author Name :</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Input Author's Name"
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </FormGroup>
                  <Button color="warning"> ADD </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AddForm);
