import React, { Component } from "react"
import "../../styles/auth.css"
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import Swal from 'sweetalert2'
import { Col, Row, Container, Form, FormGroup, Input, Label, Button } from "reactstrap"
import { Link } from "react-router-dom"
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username : '',
            password : ''
        }
    }
    loginUser = (e) => {
        e.preventDefault()
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        this.props.login(data) 
        .then(() => {
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
    render () {;
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
const mapStateToProps = (state) => ({
    auth : state.auth
})

const mapDispatchToProps = { login }
export default connect(mapStateToProps, mapDispatchToProps)(Login)