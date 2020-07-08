import React, { Component } from "react"
import detailStyle from '../styles/detail.module.css'
import Swal from 'sweetalert2'
import { Container, Nav, Navbar, NavItem,Button } from "reactstrap"
import ModalEdit from "../components/ModalEdit"
import { getDetailBook, deleteBook, patchBorrowBook } from "../redux/actions/book"
import { connect } from "react-redux";

class DetailBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            book : [],
            showModalUpdate : false,
            showModalDelete : false,
        }
    }
    getDetailBook = () => {
        const token = this.props.auth.data.token
        const id = this.props.match.params.id
        this.props.dispatch(getDetailBook(id,token))
        .then(() => {
            this.setState({
                book : this.props.book.data
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
              const token = this.props.auth.data.token
              const id = this.props.match.params.id
              this.props.dispatch(deleteBook(id, token))
              .then((res)=>{
                Swal.fire(
                    'Deleted!',
                    `The Book With id = ${res.value.data.data.id} deleted.`,
                    'success'
                )
                this.props.history.push('/')
              }).catch((err)=> {
                  console.log(err)
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong'
                  })
              })
            }
          })
    }
    handleBorrowBook= async (e) => {
        e.preventDefault()
        const token = this.props.auth.data.token
        const id = this.props.match.params.id
        await this.props.dispatch(patchBorrowBook(id, token))
        .then(() => {
            this.getDetailBook()  
            this.getLoanBook()
            this.props.history.push(`/book/${id}`)
        }).catch((err) => {
            console.log(err)
        })
    }
    backButton = (e) => {
        e.preventDefault()
        window.history.back()
    }
    // getLoanBook = async () => {
    //     const token = this.props.auth.data.token
    //     const id = this.props.match.params.id
    //     await this.props.dispatch(getLoanBook(id, token))
    //     .then(() => {
    //         this.setState({
    //             loan : this.props.loan.data
    //         })
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }

    // handleReturnBook = (e) => {
    //     e.preventDefault()
    //     const token = localStorage.getItem('token')
    //     axios({
    //         method: "PATCH",
    //         url: process.env.REACT_APP_API_URL + 'books/' + this.props.match.params.id + "/return",
    //         headers : {
    //             Authorization : token
    //         }
    //     }).then(() => {
    //         this.props.history.push(`/book/${this.props.match.params.id}`)
    //         this.getDetailBook()  
    //         this.getLoanBook()
    //         // window.location.reload()
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }
    componentDidMount(){
        // this.getLoanBook()
        this.getDetailBook()  
    }
    render() {
        const toggleEdit = () => this.setState({showModalUpdate: !this.state.showModalUpdate})
        let disabledButton = this.state.book.status === "Available" ? false : true
        let classStatus = this.state.book.status === "Available" ? 'text-success' : 'text-danger'
        // const user_id = this.props.auth.data.id
        const role = this.props.auth.data.role
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
                        {role === 'admin' ? 
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
                    <Button color="warning" size="lg" disabled={disabledButton} onClick={this.handleBorrowBook} style={{ position : 'absolute', width : 'auto', top : '550px', left: '1150px' }}>Borrow</Button>
                <Container>
                <div className="badge badge-warning" style={{  position:'absolute',top: '410px', }}>{this.state.book.genre}</div>
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
                <ModalEdit modalEditShow={this.state.showModalUpdate} toggle={toggleEdit} {...this.props} />
                </Container>
            </div>
            </Container>    
        )
    }
}

const mapStateToProps = state => ({
    book : state.book,
    auth : state.auth
})
export default connect(mapStateToProps)(DetailBook);