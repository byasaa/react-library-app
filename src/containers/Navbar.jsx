import React, {useState} from 'react'
import { 
  Navbar, Nav,
  Input, Button, Form } from "reactstrap"
import '../styles/navbar.css';

function NavBar (props) {
  const [search, setSearch] = useState('')
  const [orderBy, setOrder] = useState('')
  const [sort, setSort] = useState('')
  const enterSearch = (e) => {
    e.preventDefault()
   props.history.push(`/?search=${search}`)
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
                <Button color="warning" onClick={()=> props.history.push(`${props.location.pathname}?orderBy=${orderBy}&sort=${sort}`)}>Filter</Button>
              </Form>
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Order By
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={true}>
                    Tite
                  </DropdownItem>
                  <DropdownItem>
                    Author
                  </DropdownItem>
                  <DropdownItem>
                    Genre
                  </DropdownItem>
                  <DropdownItem>
                    Description
                  </DropdownItem>
                  <DropdownItem>
                    Created At
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Sort By
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={true}>
                    ASC
                  </DropdownItem>
                  <DropdownItem onClick={true}>
                    DESC
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
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