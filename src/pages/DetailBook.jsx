import React, { Component } from "react"
import axios from 'axios'
import detailStyle from '../styles/detail.module.css'
import Swal from 'sweetalert2'
import { Container, Nav, Navbar, NavbarText, NavItem } from "reactstrap"
import ModalEdit from "../components/ModalEdit"

class DetailBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModalUpdate : false,
            showModalDelete : false,
            showModalLoan : false,
            book : []
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
    componentDidMount(){
     this.getDetailBook()   
    }
    render() {
        const toggleEdit = () => this.setState({showModalUpdate: !this.state.showModalUpdate})
        const {title, description, created_at, image, status} = this.state.book
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

            backgroundImage: `url("${process.env.REACT_APP_API_URL}img/${image}")`,
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
        
            background: `url("${process.env.REACT_APP_API_URL}img/${image}")`,
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.25)',
            borderRadius: '13px',
            backgroundSize: 'cover'
        }
        return (
            <Container fluid>
            <div style={cover}>
                    <Navbar expand="md" color="light">
                        <Nav className="mr-auto" navbar>
                        <NavItem className="mr-3">
                             <NavbarText onClick={toggleEdit}>Edit</NavbarText>
                        </NavItem>
                        <NavItem>
                             <NavbarText onClick={this.handleDeleteBook}>Hapus</NavbarText>
                        </NavItem>
                        </Nav>
                    </Navbar>
                <div style={coverMini}>
                </div>
                <Container>
                <div className="badge badge-warning" style={{  position:'absolute',top: '410px', }}>Novel</div>
                <p style={{ position : 'absolute',
                            width: 'auto',
                            height: '51px',
                            left: '850px',
                            top: '400px',
                            fontFamily: 'Open Sans',
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fontSize: '30px',
                            lineHeight: '68px',
                            color: '#99D815'
                }}>{status}</p>
                <div>
                    <h1 className={detailStyle.title}>{ title }</h1>
                    <p className={detailStyle.date}> {formatDate(created_at)} </p>
                </div>
                <div>
                    <p className={detailStyle.description}> {description} </p>
                </div>
                <ModalEdit modalEditShow={this.state.showModalUpdate} toggle={toggleEdit} data={this.state.book} />
                </Container>
            </div>
            </Container>    
        )
    }
}

export default DetailBook;