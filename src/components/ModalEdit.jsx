import React, {Component} from 'react'
import Swal from "sweetalert2"
import { Button, Modal, ModalHeader, ModalBody,
Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from "react-redux";
import { getDetailBook, putUpdateBook } from "../redux/actions/book";
import { getAuthor } from "../redux/actions/author";
import { getGenre } from "../redux/actions/genre";

class ModalEdit extends Component {
  constructor(props){
    super(props)
    this.state = {
      title : "",
      description : "",
      author : "",
      genre : "",
      image : "",
      status : "",
      authors : [],
      genres : []
    }
  }
  getDetailBook = async () => {
    const token = this.props.auth.data.token
    const id = this.props.match.params.id
    console.log(id)
    await this.props.dispatch(getDetailBook(id, token))
    .then(() => {
      this.setState({
          title : this.props.book.data.title,
          description : this.props.book.data.description,
          author : this.props.book.data.author_id,
          genre : this.props.book.data.genre_id,
          image : process.env.REACT_APP_API_URL + 'img/' + this.props.book.data.image,
          status : this.props.book.data.status
      })
    })
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
   handlePutBook = (e) => {
     e.preventDefault()
     const token = this.props.auth.data.token
     const id = this.props.match.params.id
     const formData = new FormData()
        formData.append('title', this.state.title)
        formData.append('description', this.state.description)
        formData.append('author_id', this.state.author)
        formData.append('genre_id', this.state.genre)
        formData.append('image', this.state.image[0])
     this.props.dispatch(putUpdateBook(id, formData, token))
     .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Update Success',
          showConfirmButton: true,
          timer: 1500 
        }).then((result) => {
          if(result)
          window.location.reload()
        })
     })
     .catch((err) => {
      console.log(err)
     })
   }
   componentDidMount(){
     this.getDetailBook()
     this.getAuthor()
     this.getGenre()
   }
    render() {
        const {
            className,
            modalEditShow,
            toggle,
          } = this.props;
        return (
            <>
            <Modal isOpen={modalEditShow} toggle={toggle} className={className} >
                <ModalHeader toggle={toggle}>Edit Book</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.handlePutBook}>
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
                  </FormGroup>
                <Button color="primary" >Update</Button>{' '}
                </Form>
              </ModalBody>
              </Modal>
            </>
        )
    }
}

const mapStateToProps = state => ({
  auth : state.auth,
  book : state.book,
  genre : state.genre,
  author : state.author
})
export default connect(mapStateToProps)(ModalEdit)