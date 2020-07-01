import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import {Col, Card, CardImg, CardBody} from "reactstrap"

class Books extends Component {
    constructor(){
        super()
        this.state = {
            books : []
        }
    }
    getAllBook = () => {
        const token = localStorage.getItem('token')
        axios({
            method : 'GET',
            url: 'http://localhost:3000/api/books',
            headers : {
                Authorization : token
            }

        })
        .then((res)=>{
            console.log(res)
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
                    return <Col key={book.id} lg={3} md={6} className="mb-4 mb-lg-0" >
                    <Card className="shadow-sm border-0 rounded" >
                        <CardBody className="p-0" >
                        <CardImg src={`${process.env.REACT_APP_API_URL}img/${book.image}`} alt={`${book.title}`} />
                            <div className="p-4">
                                <h5 className="mb-0"> {book.title} </h5>
                                <p className="small text-muted"> {book.description} </p>
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