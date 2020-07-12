import React, { Component } from "react"
import {Row, Col, Form, FormGroup, Label, Input, Card, CardBody, CardHeader, Button} from "reactstrap"
import { putUpdateGenre, getDetailGenre } from "../../redux/actions/genre";
import { connect } from "react-redux";
import Swal from 'sweetalert2';

class UpdateForm extends Component {
    constructor() {
        super()
        this.state = {
            name : ''
        }
    }
    handlePutUpdateGenre = (e) => {
        e.preventDefault();
        const data = {
           name : this.state.name
        }
        const token = this.props.auth.data.token
        const id = this.props.match.params.id
        this.props.dispatch(putUpdateGenre(id, data, token))
        .then((res) => {
            Swal.fire(
                'Update Genre Success!',
                `With id = ${res.value.data.data.id}`,
                'success'
            )
            .then(()=> {
                this.props.history.push('/genre')
            })
            .catch((err) => {
                console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
              })
            })
        })
    }
    handleGetDetailGenre = () => {
        const token = this.props.auth.data.token
        const id = this.props.match.params.id
        this.props.dispatch(getDetailGenre(id, token))
        .then(() => {
            this.setState({
            name : this.props.genre.data.name
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    componentDidMount() {
        this.handleGetDetailGenre()
    }
    render() {
        return (
            <main className="content mb-5 mt-4">
                <Row>
                    <Col md={10}>
                        <Card>
                            <CardHeader>
                               Update Genre
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={this.handlePutUpdateGenre}>
                                    <FormGroup>
                                        <Label for="name">Genre Name :</Label>
                                        <Input type="text" name="name" id="name" placeholder="Input Genre Name" value={this.state.name} onChange={(e) => this.setState({ name : e.target.value })} />
                                    </FormGroup>
                                    <Button color="warning"> Update </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </main>
        )
    }
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    genre : state.genre
})

export default connect(mapStateToProps)(UpdateForm)