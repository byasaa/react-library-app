import React, {useState} from 'react'
import { 
  Navbar, Nav,
  Input, Button, Form } from "reactstrap"
import '../styles/navbar.css';
import QueryString from 'query-string';

function NavBar (props) {
  const [search, setSearch] = useState('')
  const [orderBy, setOrder] = useState('')
  const [sort, setSort] = useState('')
  const enterSearch = (e) => {
    e.preventDefault()
    if (props.location.search === ""){
      props.history.push(`/?search=${search}`)
    } else {
      let qs = QueryString.parse(props.location.search)
      if (qs.search){
        const url = props.location.search.replace(`search=${qs.search}`, `search=${search}`)
        props.history.push(url)
      }else {
        props.history.push(`${props.location.search}&search=${search}`)
      }
    }
  }
  const filter = () => {
    if (props.location.search === ""){
      props.history.push(`/?orderBy=${orderBy}&sort=${sort}`)
    } else {
      let qs = QueryString.parse(props.location.search)
      if (qs.sort || qs.orderBy){
        props.history.push(props.location.search.replace(`orderBy=${qs.orderBy}`, `orderBy=${orderBy}`).replace(`sort=${qs.sort}`, `sort=${sort}`))
      }else {
        props.history.push(`${props.location.search}&orderBy=${orderBy}&sort=${sort}`)
      }
    } 
  }
  return (
      <>
        <Navbar color="light" light expand="md" style={{ boxShadow : '0 .5rem 1rem rgba(0,0,0,.15) !important' ,marginLeft: '-15px', marginRight: '-40px' }}>
            <Nav className="mr-auto" navbar>
              <Form onSubmit={()=> props.history.push(`${props.location.search}&orderBy=${orderBy}&sort=${sort}`)} className="d-flex flex-row" >
                <Input type="select" name="orderBy" onChange={(e) => setOrder(e.target.value)} value={orderBy}>
                  <option value="">---Order---</option>
                  <option value="title">Title</option>
                  <option value="description">Description</option>
                  <option value="genre">Genre</option>
                  <option value="author">Author</option>
                  <option value="created_at">Created</option>
                </Input>
                <Input type="select" name="sort" onChange={(e) => setSort(e.target.value)} value={sort}>
                  <option value="">---Sort---</option>
                  <option value="asc">ASC</option>
                  <option value="desc">DESC</option>
                </Input>
              <Input type="hidden" name="page" value={1} />
                <Button color="warning" onClick={()=> filter()}>Filter</Button>
              </Form>
            </Nav>
              <div id="custom-search-input" className="d-flex align-items-center">
                <Form onSubmit={enterSearch}>
                <div className="input-group col-md-12">
                    <input type="text" className="form-control input-lg" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => enterSearch} />
                    <span className="input-group-btn">
                        <button className="btn btn-info btn-lg" type="button">
                            <i className="fa fa-search"></i>
                        </button>
                    </span>
                </div>
                </Form>
            </div>
        </Navbar>
      </>
  );
}

export default NavBar