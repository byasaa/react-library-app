import React from 'react'
import { 
  Navbar, Nav,
  UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, } from "reactstrap"

function NavBar () {
  return (
    <>
      <div>
        <Navbar color="light" light expand="md">
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
        </Navbar>
      </div>
    </>
  );
}

export default NavBar