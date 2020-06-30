import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'
import {Col, Card, CardImg, CardBody, CardTitle, CardText} from "reactstrap"

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
                    return <Col key={book.id} md={3}>
                    <Card>
                        <CardImg top width="100%" src={`http://localhost:3000/api/img/${book.image}`} alt={`${book.title}`} />
                        <CardBody>
                            <CardTitle>{book.title}</CardTitle>
                            <CardText> {book.description} </CardText>
                            <Link to={`/book/${book.id}`} >Detail</Link>
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