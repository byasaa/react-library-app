import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import QueryString from "query-string"
import { connect } from "react-redux";
import {Col, Card, CardImg, CardBody, Button} from "reactstrap"
import { getBook } from '../redux/actions/book';
import Swal from 'sweetalert2';

class Books extends Component {
    constructor(props){
        super(props)
        this.state = {
            books : [],
            page : 1
        }
        console.log(this.state)
    }
    getAllBook = async () => {
        let qs = QueryString.parse(this.props.location.search)
        let search = qs.search || ""
        let limit = qs.limit || "4"
        let page = qs.page || ""
        let order = qs.orderBy || "created_at"
        let sort = qs.sort || "DESC"
        const token = this.props.auth.data.token
        await this.props.dispatch(getBook(search, limit, page, order, sort, token))
        .then(() => {
            this.setState({
                books  : this.props.book.data
            })
        })
        .catch((err) => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Data Null",
            })
        })
    }
    nextPage = () => {
        let qs = QueryString.parse(this.props.location.search)
        qs.page = qs.page ||  1
        if (this.props.location.search === ""){
            this.props.history.push(`/?page=${parseInt(qs.page)+1}`)
          } else {
            if (qs.page >= 1){
              const url = this.props.location.search.replace(`page=${qs.page}`, `page=${parseInt(qs.page)+1}`)
              this.props.history.push(url)
            }else {
              this.props.history.push(`${this.props.location.search}&page=${parseInt(qs.page)+1}`)
            }
        }
    }
   prevPage = () => {
    let qs = QueryString.parse(this.props.location.search)
    qs.page = qs.page ||  1
        if (this.props.location.search === ""){
            this.props.history.push(`/?page=${parseInt(qs.page)-1}`)
          } else {
            if (qs.page){
              const url = this.props.location.search.replace(`page=${qs.page}`, `page=${parseInt(qs.page)-1}`)
              this.props.history.push(url)
            }else {
              this.props.history.push(`${this.props.location.search}&page=${parseInt(qs.page)-1}`)
            }
        }
    }
    componentDidMount(){
        this.getAllBook()
    }
    componentDidUpdate(prevProps) {
        if(prevProps.location.search !== this.props.location.search){
            this.getAllBook()
        }
    }
    render(){
        let qs = QueryString.parse(this.props.location.search)
        qs.page = qs.page ||  '1'
        let disableButton = qs.page === '1' ? true : false
        return(
            <>
            {
                this.state.books.map((book) => {
                    return <Col key={book.id} lg={3} md={6} className="mt-3 mb-4 mb-lg-0" >
                    <Card className="shadow-sm border-0 rounded" >
                        <CardBody className="p-0" >
                        <CardImg src={`${process.env.REACT_APP_API_URL}img/${book.image}`} alt={`${book.title}`} />
                            <div className="p-4">
                                <h5 className="mb-0"> {book.title} </h5>
                                <p className="small text-muted"> {book.description} </p>
                            <Link to={`/book/${book.id}`} className="card-link">Detail</Link>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                })
            }
                <Col md={12}>
                    <Button color="warning" disabled={disableButton} className="mr-auto" onClick={() => this.prevPage()}>Prev</Button>{"  "}
                    <Button color="warning" className="ml-auto" onClick={() => this.nextPage()}> Next</Button>
                </Col>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    book : state.book
})
export default connect(mapStateToProps)(Books)