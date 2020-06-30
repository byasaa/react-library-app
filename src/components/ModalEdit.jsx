import React, {Component} from 'react'
import axios from "axios"
import Swal from "sweetalert2"
import { Button, Modal, ModalHeader, ModalBody,
Form, FormGroup, Label, Input,FormText } from 'reactstrap';

class ModalEdit extends Component {
  constructor(props){
    super(props)
    this.state = {
      authors : [],
      genres : []
    }
  }
  getAuthor = () => {
    const token = localStorage.getItem('token')
      axios({
        method : "GET",
        url : process.env.REACT_APP_API_URL + 'authors/',
        headers : {
          Authorization : token
        }
      })
      .then((res) => {
        this.setState({
          authors : res.data.data
        })
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
   }
   getGenre = () => {
    const token = localStorage.getItem('token')
    axios({
      method : "GET",
      url : process.env.REACT_APP_API_URL + 'genres/',
      headers : {
        Authorization : token
      }
    })
    .then((res) => {
      this.setState({
        genres : res.data.data
      })
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
   }
   componentDidMount(){
     this.getAuthor()
     this.getGenre()
   }
    render() {
        const {
            className,
            modalEditShow,
            toggle,
            data
          } = this.props;
        return (
            <>
            <Modal isOpen={modalEditShow} toggle={toggle} className={className} >
                <ModalHeader toggle={toggle}>Edit Book</ModalHeader>
                <ModalBody>
                  <Form>
                      <FormGroup>
                          <Label>Title</Label>
                          <Input type='text' placeholder='Title' value={data.title} />
                      </FormGroup>
                      <FormGroup>
                          <Label>Description</Label>
                          <Input type='textarea' placeholder='Description' value={data.description} />
                      </FormGroup>
                      <FormGroup>
                      <Label>Author</Label>
                        <Input type="select" name="author" value={data.author} >
                        {this.state.authors.map((author) => {
                            return <option key={author.id} value={author.id}>{author.name}</option>
                          })}
                        </Input>
                      </FormGroup>
                      <FormGroup>
                      <Label>Genre</Label>
                        <Input type="select" name="genre" >
                        {this.state.genres.map((genre) => {
                            return <option key={genre.id} value={genre.id}>{genre.name}</option>
                          })}
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleFile">Image</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                        This is some placeholder block-level help text for the above input.
                        It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup>
                  <Button color="primary">Update</Button>{' '}
                  </Form>
                </ModalBody>
              </Modal>
            </>
        )
    }
}

export default ModalEdit