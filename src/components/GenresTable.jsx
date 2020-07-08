import React, { Component } from "react"
import {Row, Col, Table, Card, CardBody, CardHeader, Button} from "reactstrap"
// import {Link} from 'react-router-dom';
import { getGenre } from "../redux/actions/genre";
import { connect } from "react-redux";

class GenresTable extends Component {
    constructor() {
        super()
        this.state = {
            genres : []
        }
    }
    handleGetGenre = () => {
        const token = this.props.auth.data.token
        this.props.dispatch(getGenre(token))
        .then(() => {
            this.setState({
                genres : this.props.genre.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    componentDidMount(){
        this.handleGetGenre()
    }
    render() {
        let i = 1
        return (
            <main className="content mb-5 mt-4">
                <Row>
                    <Col md={8}>
                        <Card>
                            <CardHeader>
                                List Genre
                            </CardHeader>
                            <CardBody>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Genre</th>
                                    <th>
                                        <Button color="primary">Add Genre</Button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.genres.map((genre) => {
                                return <tr key={genre.id}>
                                <th scope="row">{i++}</th>
                                    <td>{genre.name}</td>
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
    genre : state.genre
})

export default connect(mapStateToProps)(GenresTable)