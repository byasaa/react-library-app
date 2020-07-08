import React, { Component } from "react"
import {Row, Col, Table, Card, CardBody, CardHeader, Button} from "reactstrap"
// import {Link} from 'react-router-dom';
import { getLoanByUser, patchReturnBook } from "../redux/actions/loan";
import { connect } from "react-redux";

class HistoryTable extends Component {
    constructor() {
        super()
        this.state = {
            loans : []
        }
    }
    handleGetHistory = () => {
        const token = this.props.auth.data.token
        const id = this.props.auth.data.id
        this.props.dispatch(getLoanByUser(id, token))
        .then(() => {
            this.setState({
                loans : this.props.loan.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    handleReturnBook = (id, book_id, token) => {
        this.props.dispatch(patchReturnBook(id, book_id, token))
        .then(() => {
            this.props.history.push('/history')
            this.handleGetHistory()
        })
        .catch((err) => {
            console.log(err)
        })
    }
    componentDidMount(){
        this.handleGetHistory()
    }
    render() {
        let i = 1
        return (
            <main className="content mb-5 mt-4">
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardHeader>
                                List History
                            </CardHeader>
                            <CardBody>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.loans.map((loan) => {
                                    let disabledButton = loan.status === "borrow" ? false : true
                                return <tr key={loan.id}>
                                <th scope="row">{i++}</th>
                                    <td>{loan.title}</td>
                                    <td>
                                        <img height="100px" src={process.env.REACT_APP_API_URL + 'img/' +loan.image} alt={loan.title} />
                                    </td>
                                    <td>{loan.status}</td>
                                    <td>
                                        <Button className="mr-3" color="warning" disabled={disabledButton} onClick={() => this.handleReturnBook(loan.id, loan.book_id, this.props.auth.data.token)}>Return Book</Button>
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
    loan : state.loan
})

export default connect(mapStateToProps)(HistoryTable)