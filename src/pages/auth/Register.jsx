import React, { Component } from "react"
import "../../styles/auth.css"
import axios from 'axios'
import { Col, Row, Container, Form, FormGroup, Input, Label, Button } from "reactstrap"
import { Link } from "react-router-dom"
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
        axios({
            method : "POST",
            url : 'http://localhost:3000/api/auth/register',
            data : {
                username: this.state.username,
                password : this.state.password
            }
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
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
                                <Input type="text" placeholder="Username" name="username" value={this.state.username} onChange={(e) => this.setState({username : e.target.value})} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input type="password" placeholder="Password" name="password" value={this.state.password} onChange={(e) => this.setState({password : e.target.value})} />
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
export default Register
