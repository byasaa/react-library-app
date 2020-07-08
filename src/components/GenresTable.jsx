import React, { Component } from "react"
import {Row, Col, Table, Card, CardBody, CardHeader, Button} from "reactstrap"
// import {Link} from 'react-router-dom';
import { getGenre, deleteGenre } from "../redux/actions/genre";
import { connect } from "react-redux";
import Swal from 'sweetalert2';

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
    handleDeleteAuthor = (id) => {
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
              this.props.dispatch(deleteGenre(id, token))
              .then((res)=>{
                Swal.fire(
                    'Deleted!',
                    `The Genre With id = ${res.value.data.data.id} deleted.`,
                    'success'
                )
                this.props.history.push('/genre')
                this.handleGetGenre()
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
                                        <Button onClick={() => this.props.history.push('/genre/create')} color="primary">Add Genre</Button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.genres.map((genre) => {
                                return <tr key={genre.id}>
                                <th scope="row">{i++}</th>
                                    <td>{genre.name}</td>
                                    <td>
                                        <Button className="mr-3" onClick={() => this.props.history.push('/author/edit/'+genre.id)} color="success" >Edit</Button>
                                        <Button color="danger" onClick={() => this.handleDeleteAuthor(genre.id)}>Delete</Button>
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