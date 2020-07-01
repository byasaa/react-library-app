import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import QueryString from "query-string"
import {Col, Card, CardImg, CardBody} from "reactstrap"

class Books extends Component {
    constructor(props){
        super(props)
        this.state = {
            books : []
        }
    }
    getAllBook = () => {
        let qs = QueryString.parse(this.props.location.search)
        let search = qs.search || ""
        let limit = qs.limit || ""
        const token = localStorage.getItem('token')
        axios({
            method : 'GET',
            url: `${process.env.REACT_APP_API_URL}books?search=${search}&limit=${limit}`,
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
    componentDidMount(){
        this.getAllBook()
    }
    render(){
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
            </>
        )
    }
}
export default Books