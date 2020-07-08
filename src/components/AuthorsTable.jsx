import React, { Component } from "react"
import {Row, Col, Table, Card, CardBody, CardHeader, Button} from "reactstrap"
// import {Link} from 'react-router-dom';
import { getAuthor } from "../redux/actions/author";
import { connect } from "react-redux";

class AuthorsTable extends Component {
    constructor() {
        super()
        this.state = {
            authors : []
        }
    }
    handleGetAuthor = () => {
        const token = this.props.auth.data.token
        this.props.dispatch(getAuthor(token))
        .then(() => {
            this.setState({
                authors : this.props.author.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    componentDidMount(){
        this.handleGetAuthor()
    }
    render() {
        let i = 1
        return (
            <main className="content mb-5 mt-4">
                <Row>
                    <Col md={10}>
                        <Card>
                            <CardHeader>
                                List Author
                            </CardHeader>
                            <CardBody>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Author</th>
                                    <th>
                                        <Button color="primary">Add Author</Button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.authors.map((author) => {
                                return <tr key={author.id}>
                                <th scope="row">{i++}</th>
                                    <td>{author.name}</td>
                                    <td>
                                        <Button className="mr-3" color="success" >Edit</Button>
                                        <Button color="danger" >Delete</Button>
                                    </td>
                                </tr>
                                })}
                            </tbody>
                            </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </main>
        )
    }
}

const mapStateToProps = (state) => ({
    auth : state.auth,
    author : state.author
})

export default connect(mapStateToProps)(AuthorsTable)