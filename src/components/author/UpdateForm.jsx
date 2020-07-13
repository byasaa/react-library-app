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
import { putUpdateAuthor, getDetailAuthor } from "../../redux/actions/author";
import { connect } from "react-redux";
import Swal from "sweetalert2";

class UpdateForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }
  handlePutUpdateAuthor = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
    };
    const token = this.props.auth.data.token;
    const id = this.props.match.params.id;
    this.props.dispatch(putUpdateAuthor(id, data, token)).then((res) => {
      Swal.fire(
        "Update Author Success!",
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
  handleGetAuthorDetail = () => {
    const token = this.props.auth.data.token;
    const id = this.props.match.params.id;
    this.props
      .dispatch(getDetailAuthor(id, token))
      .then(() => {
        this.setState({
          name: this.props.author.data.name,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.handleGetAuthorDetail();
  }
  render() {
    return (
      <main className="content mb-5 mt-4">
        <Row>
          <Col md={10}>
            <Card>
              <CardHeader>Update Author</CardHeader>
              <CardBody>
                <Form onSubmit={this.handlePutUpdateAuthor}>
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
                  <Button color="warning"> Update </Button>
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
  author: state.author,
});

export default connect(mapStateToProps)(UpdateForm);
