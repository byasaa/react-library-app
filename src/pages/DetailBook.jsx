import React, { Component } from "react"
import axios from 'axios'
import detailStyle from '../styles/detail.module.css'
import Swal from 'sweetalert2'
import { Container, Nav, Navbar, NavItem,Button } from "reactstrap"
import ModalEdit from "../components/ModalEdit"

class DetailBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            book : [],
            loan : [],
            showModalUpdate : false,
            showModalDelete : false,
            showModalLoan : false
        }
    }
    getDetailBook = () => {
        const token = localStorage.getItem('token')
        axios({
            method : "GET",
            url : process.env.REACT_APP_API_URL + 'books/' + this.props.match.params.id,
            headers : {
                Authorization : token
            }
        })
        .then((res) => {
            console.log(res)
            this.setState({
                book : res.data.data[0]
            })
            console.log(this.state)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    handleDeleteBook = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              const token = localStorage.getItem('token')
              axios({
                  method : "DELETE",
                  url : process.env.REACT_APP_API_URL + 'books/' + this.props.match.params.id,
                  headers :{
                      Authorization : token
                  }
              }).then((res)=>{
                console.log(res)
                Swal.fire(
                    'Deleted!',
                    `The Book With id = ${res.data.data.id} deleted.`,
                    'success'
                )
                this.props.history.push('/')
              }).catch((err)=> {
                  console.log(err)
              })
            }
          })
    }
    handleBorrowBook= (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        axios({
            method: "PATCH",
            url: process.env.REACT_APP_API_URL + 'books/' + this.props.match.params.id + "/borrow",
            headers : {
                Authorization : token
            }
        }).then((res) => {
            console.log(res)
            window.location.reload()
        }).catch((err) => {
            console.log(err)
        })
    }
    backButton = (e) => {
        e.preventDefault()
        window.history.back()
    }
    getLoanBook = () => {
        const token = localStorage.getItem('token')
        axios({
            method : "GET",
            url : process.env.REACT_APP_API_URL + 'loans/book/' + this.props.match.params.id,
            headers : {
                Authorization : token
            }
        })
        .then((res) => {
            console.log(res)
            this.setState({
                loan : res.data.data[0]
            })
            console.log(this.state)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    handleReturnBook = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        axios({
            method: "PATCH",
            url: process.env.REACT_APP_API_URL + 'books/' + this.props.match.params.id + "/return",
            headers : {
                Authorization : token
            }
        }).then((res) => {
            console.log(res)
            window.location.reload()
        }).catch((err) => {
            console.log(err)
        })
    }
    componentDidMount(){
     this.getDetailBook()  
     this.getLoanBook()
    }
    render() {
        const toggleEdit = () => this.setState({showModalUpdate: !this.state.showModalUpdate})
        let disabledButton = this.state.book.status === "Available" ? false : true
        let classStatus = this.state.book.status === "Available" ? 'text-success' : 'text-danger'
        const user_id = localStorage.getItem('id')
        const role = localStorage.getItem('role')
        // const {title, description, created_at, image, status} = this.state.book
        const formatDate = date => {
            let data = Date.parse(date);
            let newDate = new Date(data);
            let day = newDate.getDate();
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let month = months[newDate.getMonth()];
            let year = newDate.getFullYear();
            return `${day} ${month} ${year}`
        }
        const cover = {
            position: 'fixed',
            width: '100%',
            height: '400px',
            left: '0px',
            top: '0px',

            backgroundImage: `url("${process.env.REACT_APP_API_URL}img/${this.state.book.image}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }
        const coverMini = {
            position: 'absolute',
            width: '200px',
            height: '288px',
            left: '1100px',
            top: '200px',
        
            backgroundImage: `url("${process.env.REACT_APP_API_URL}img/${this.state.book.image}")`,
            backgroundSize: 'cover',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.25)',
            borderRadius: '13px',
            webKitBackgroundSize : '100%'
        }
        return (
            <Container fluid>
            <div style={cover}>
                    <Navbar expand="md">
                        <Nav className="mr-auto">
                            <NavItem className="mr-3">
                                <Button outline color="warning" onClick={this.backButton}>
                                    Back
                                </Button>
                            </NavItem>
                        </Nav>
                        {role == 'admin' ? 
                        <Nav className="ml-auto" navbar sty>
                        <NavItem className="mr-3">
                             <Button outline color="warning" onClick={toggleEdit}>Edit</Button>
                        </NavItem>
                        <NavItem>
                            <Button outline color="warning" onClick={this.handleDeleteBook}>Delete</Button>
                        </NavItem>
                        </Nav> : false
                        }
                    </Navbar>
                <div style={coverMini}></div>
                    {this.state.book.status == "Available" ? <Button color="warning" size="lg" disabled={disabledButton} onClick={this.handleBorrowBook} style={{ position : 'absolute', width : 'auto', top : '550px', left: '1150px' }}>Borrow</Button> : this.state.loan.user_id == user_id ? 
                    <Button color="primary" size="lg" onClick={this.handleReturnBook} style={{ position : 'absolute', width : 'auto', top : '550px', left: '1150px' }}>Return</Button>
                    : 
                    <Button color="warning" size="lg" disabled={disabledButton} onClick={this.handleBorrowBook} style={{ position : 'absolute', width : 'auto', top : '550px', left: '1150px' }}>Borrow</Button>
                    }

                <Container>
                <div className="badge badge-warning" style={{  position:'absolute',top: '410px', }}>Novel</div>
                <p className={classStatus} style={{ position : 'absolute',
                            width: 'auto',
                            height: '51px',
                            left: '850px',
                            top: '400px',
                            fontFamily: 'Open Sans',
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fontSize: '30px',
                            lineHeight: '68px'
                }}>{this.state.book.status}</p>
                <div>
                    <h1 className={detailStyle.title}>{ this.state.book.title }</h1>
                    <p className={detailStyle.date}> {formatDate(this.state.book.created_at)} </p>
                </div>
                <div>
                    <p className={detailStyle.description}> {this.state.book.description} </p>
                </div>
                <ModalEdit modalEditShow={this.state.showModalUpdate} toggle={toggleEdit} data={this.state.book} {...this.props} />
                </Container>
            </div>
            </Container>    
        )
    }
}

export default DetailBook;