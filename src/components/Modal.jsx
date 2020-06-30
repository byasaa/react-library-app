import React, {Component} from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, FormText } from 'reactstrap';

class Modals extends Component {
       constructor(props){
         super(props)
         this.state = {
          title : '',
          description : '',
          author : '',
          genre : '',
          image : '',
          book_status : 'Available',
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
      handlePostBook = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const formData = new FormData()
        formData.append('title', this.state.title)
        formData.append('description', this.state.description)
        formData.append('author_id', this.state.author)
        formData.append('genre_id', this.state.genre)
        formData.append('image', this.state.image[0])
        formData.append('book_status', this.state.book_status)

        console.log(this.state.genre)
        console.log(this.state.author)
        axios({
          method : "POST",
          url : process.env.REACT_APP_API_URL + 'books/',
          data: formData,
          headers : {
            'Content-Type' : 'multipart/form-data',
            Authorization : token
          }
        })
        .then((res) => {
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

       render(){
        const {
          className,
          modalShow,
          toggle
        } = this.props;
        return (
          <div>
            <Modal isOpen={modalShow} toggle={toggle} className={className}>
              <ModalHeader toggle={toggle}>Add Book</ModalHeader>
              <ModalBody>
              <Form onSubmit={this.handlePostBook}>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input type='text' placeholder='Title' value={this.state.title} onChange={(e) => this.setState({title : e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input type='textarea' placeholder='Description' value={this.state.description} onChange={(e) => this.setState({description : e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                    <Label>Author</Label>
                      <Input type="select" name="author" value={this.state.author} onChange={(e) => this.setState({author : e.target.value})} >
                        <option value="0">Pilih Author</option>
                          {this.state.authors.map((author) => {
                            return <option key={author.id} value={author.id}>{author.name}</option>
                          })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                    <Label>Genre</Label>
                      <Input type="select" name="genre" value={this.state.genre} onChange={(e) => this.setState({genre : e.target.value})} >
                      <option value="0">Pilih Genre</option>
                        {this.state.genres.map((genre) => {
                            return <option key={genre.id} value={genre.id}>{genre.name}</option>
                          })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Image</Label>
                      <Input type="file" name="file" onChange={(e) => this.setState({image: e.target.files})}/>
                      <FormText color="muted">
                      This is some placeholder block-level help text for the above input.
                      It's a bit lighter and easily wraps to a new line.
                      </FormText>
                  </FormGroup>
                <Button color="primary" >Create</Button>{' '}
                </Form>
              
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
       }
}

export default Modals