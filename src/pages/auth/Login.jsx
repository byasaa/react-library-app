import React, { Component } from "react"
import "../../styles/auth.css"
import axios from 'axios'
import Swal from 'sweetalert2'
import { Col, Row, Container, Form, FormGroup, Input, Label, Button } from "reactstrap"
import { Link } from "react-router-dom"
class Login extends Component {
    constructor() {
        super()
        this.state = {
            username : '',
            password : ''
        }
    }
    loginUser = (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            url : 'http://localhost:3000/api/auth/login',
            data : {
                username :this.state.username,
                password : this.state.password
            }
        })
        .then((res) => {
            console.log(res)
            localStorage.setItem('token', res.data.data[0].token)
            localStorage.setItem('refreshToken', res.data.data[0].refreshToken)
            localStorage.setItem('username' , res.data.data[0].username)
            localStorage.setItem('role' , res.data.data[0].role)
            localStorage.setItem('id' , res.data.data[0].id)
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
              })
            this.props.history.push('/')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    render () {
        return (
            <div>
                <Container>
                <Row>
                    <Col md="8" >
                        <div className="banner d-none d-lg-block d-md-block">
                            
                        </div>
                    </Col>
                    <Col md="4" >
                            <h1 className="mt-5">Login</h1>
                            <p>Welcome Back, Please Login to your account</p>
                            <Form onSubmit={this.loginUser}>
                                <FormGroup>
                                    <Label>Username</Label>
                                <Input type="text" placeholder="Username" name="username" value={this.state.username} onChange={(e) => this.setState({username : e.target.value})} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input type="password" placeholder="Password" name="password" value={this.state.password} onChange={(e) => this.setState({password : e.target.value})} />
                                </FormGroup> 
                                <Button color="secondary">Login</Button>{' '}
                                <Link to='/register'>
                                    <Button outline color="secondary">Sign Up</Button>{' '}
                                </Link>
                            </Form>
                    </Col>
                </Row> 
            </Container>
            </div>
        )
    }
}

export default Login