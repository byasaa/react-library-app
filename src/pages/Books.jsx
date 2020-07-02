import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import QueryString from "query-string"
import {Col, Card, CardImg, CardBody, Button,Row} from "reactstrap"

class Books extends Component {
    constructor(props){
        super(props)
        this.state = {
            books : [],
            page : 1
        }
    }
    getAllBook = () => {
        let qs = QueryString.parse(this.props.location.search)
        let search = qs.search || ""
        let limit = qs.limit || ""
        let page = qs.page || ""
        let order = qs.orderBy || "created_at"
        let sort = qs.sort || "DESC"
        const token = localStorage.getItem('token')
        axios({
            method : 'GET',
            url: `${process.env.REACT_APP_API_URL}books?search=${search}&limit=4&page=${page}&orderBy=${order}&sort=${sort}`,
            headers : {
                Authorization : token
            }
        })
        .then((res)=>{
            this.setState({
                books: res.data.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
//     nextPage = (e) => {
//         let qs = QueryString.parse(this.props.location.search)
//         e.preventDefault()
//         this.setState({
//             page: +qs.page + 1
//         })
//         this.props.history.push(`/?page=${this.state.page}`)
//     }
//    prevPage = (e) => {
//     let qs = QueryString.parse(this.props.location.search)
//         e.preventDefault()
//         this.setState({
//             page: +qs.page - 1
//         })
//         this.props.history.push(`/?page=${this.state.page}`)
//     }
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
        qs.page = qs.page ||  1
        let disableButton = qs.page == 1 ? true : false
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
                    <Button color="warning" disabled={disableButton} className="mr-auto" onClick={() => this.props.history.push(`/?page=${+qs.page-1}`)}>Prev</Button>{"  "}
                    <Button color="warning" className="ml-auto" onClick={() => this.props.history.push(`/?page=${+qs.page+1}`)}> Next</Button>
                </Col>
            </>
        )
    }
}
export default Books