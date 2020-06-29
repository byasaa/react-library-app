import React, {  } from "react"
import { Link } from "react-router-dom";
import {Nav, NavItem, NavLink} from 'reactstrap'
import "../styles/layout.css"

const Sidebar = (props) => {
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem(['token', 'refreshToken'])
    }
    return(
        <>
            <Nav className="col-md-12 d-none d-lg-block bg-light sidebar">
                <div className="user-profile sidebar-heading">
                    <img src="logo512.png" alt="user"/>
                    <h4>USER </h4> <Link onClick={handleLogout} >Logout</Link>
                </div>
                <NavItem>
                    <NavLink>Explore</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>History</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>Add Book</NavLink>
                </NavItem>
            </Nav>
        </>
    ) 
}
export default Sidebar