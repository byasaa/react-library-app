import React, { Component } from "react"
import "../../styles/auth.css"
import { connect } from "react-redux";
import Swal from "sweetalert2"
import { Col, Row, Container, Form, FormGroup, Input, Label, Button } from "reactstrap"
import { Link } from "react-router-dom"
import { register } from "../../redux/actions/auth";

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username : '',
            password : ''
        }
    }
    regUser = (e) => {
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        this.props.dispatch(register(data))
        .then(() => {
            Swal.fire(
                'Register Success!',
                `Please Login`,
                'success'
              ).then(() => this.props.history.push('/login'))
        }).catch((err) => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
              })
        })
    }
    render () {
        return (
            <>
            <Container>
                <Row>
                    <Col md="8" >
                        <div className="banner d-none d-lg-block"></div>
                    </Col>
                    <Col md="4" >
                            <h1 className="mt-5">Register</h1>
                            <p>Welcome, Please Register</p>
                            <Form onSubmit={this.regUser} >
                               <FormGroup>
                                    <Label>Username</Label>
                                <Input type="text" placeholder="Username" name="username" value={this.state.username} onChange={(e) => this.setState({username : e.target.value})} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input type="password" placeholder="Password" name="password" value={this.state.password} onChange={(e) => this.setState({password : e.target.value})} required />
                                </FormGroup> 
                                <Button color="secondary">Sign Up</Button>{' '}
                                <Link to='/login'>
                                    <Button outline color="secondary">Login</Button>{' '}
                                </Link>
                            </Form>
                    </Col>
                </Row> 
                </Container>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    register : state.register
})

export default connect(mapStateToProps)(Register)
