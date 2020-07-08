import React, {Component} from "react";
import Swal from "sweetalert2"
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
import { connect } from "react-redux";
import { postAddBook } from "../redux/actions/book";
import { getGenre } from "../redux/actions/genre";
import { getAuthor } from "../redux/actions/author";

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
       getGenre = () => {
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
      handlePostBook = (e) => {
        e.preventDefault()
        const token = this.props.auth.data.token
        const formData = new FormData()
        formData.append('title', this.state.title)
        formData.append('description', this.state.description)
        formData.append('author_id', this.state.author)
        formData.append('genre_id', this.state.genre)
        formData.append('image', this.state.image[0])
        formData.append('book_status', this.state.book_status)
        this.props.dispatch(postAddBook(formData, token))
        .then((res) => {
          console.log(res)
          Swal.fire(
            'Insert Book Success!',
            `With id = ${res.value.data.data.id}`,
            'success'
          ).then(() => window.location.reload())
        })
        .catch((err) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
          })
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
                        <Input type='text' placeholder='Title' value={this.state.title} onChange={(e) => this.setState({title : e.target.value})} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input type='textarea' placeholder='Description' value={this.state.description} onChange={(e) => this.setState({description : e.target.value})} required />
                    </FormGroup>
                    <FormGroup>
                    <Label>Author</Label>
                      <Input type="select" name="author" value={this.state.author} onChange={(e) => this.setState({author : e.target.value})} required >
                        <option value="">Pilih Author</option>
                          {this.state.authors.map((author) => {
                            return <option key={author.id} value={author.id}>{author.name}</option>
                          })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                    <Label>Genre</Label>
                      <Input type="select" name="genre" value={this.state.genre} onChange={(e) => this.setState({genre : e.target.value})} required >
                      <option value="">Pilih Genre</option>
                        {this.state.genres.map((genre) => {
                            return <option key={genre.id} value={genre.id}>{genre.name}</option>
                          })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Image</Label>
                      <Input type="file" name="file" onChange={(e) => this.setState({image: e.target.files})} required/>
                  </FormGroup>
                <Button color="primary" >Create</Button>{' '}
                </Form>
              </ModalBody>
            </Modal>
          </div>
        );
       }
}

const mapStateToProps = state => ({
  auth: state.auth,
  book: state.book,
  genre : state.genre,
  author : state.author
})
export default connect(mapStateToProps)(Modals)