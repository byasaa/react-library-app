import React, {useState} from 'react'
import { 
  Navbar, Nav,
  UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, Form } from "reactstrap"
import '../styles/navbar.css';

function NavBar (props) {
  const [search, setSearch] = useState('')
  const enterSearch = (e) => {
    e.preventDefault()
   window.location.replace(`/?search=${search}`)
  }
  return (
      <>
        <Navbar color="light" light expand="md" style={{ boxShadow : '0 .5rem 1rem rgba(0,0,0,.15) !important' ,marginLeft: '-15px', marginRight: '-40px' }}>
            <Nav className="mr-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  All Categories
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    Novel
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  All Time
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    Novel
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
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