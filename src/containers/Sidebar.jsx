import React, { useState } from "react"
import Swal from "sweetalert2"
import { useHistory, Link } from "react-router-dom";
import {Nav, NavItem, NavLink, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import "../styles/layout.css"
import {Modals} from './index'
import { logout } from "../redux/actions/auth";
import { connect } from "react-redux";

const Sidebar = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const toggle = () => setModalShow(!modalShow);
    const showModal = () => {
        setModalShow(!modalShow)
    }
    const history = useHistory()
    const handleLogout = () => {
        props.dispatch(logout())
        history.push('/login')
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Logout successfully'
          })
    }
    return(
        <>
            <Nav className="col-md-12 d-none d-lg-block bg-light sidebar">
                <div className="user-profile sidebar-heading">
                    <img src="logo512.png" alt="user"/>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            {props.auth.data.username}
                            (<span> {props.auth.data.role} </span>)
                        </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={handleLogout}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
                <div className="container">
                    <NavItem>
                        <Link to="/" className="nav-link">Explore</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/history" className="nav-link">History</Link>
                    </NavItem>
                    {props.auth.data.role === 'admin' ?
                    <NavItem >
                        <Link className="nav-link" to="/author">Author</Link>
                    </NavItem>
                    : false }
                    {props.auth.data.role === 'admin' ?
                    <NavItem >
                        <Link className="nav-link" to="/genre">Genre</Link>
                    </NavItem>
                    :false }
                    {props.auth.data.role === 'admin' ?
                    <NavItem onClick={showModal}>
                        <NavLink href="#">Add Book</NavLink>
                    </NavItem>
                    : false }
                </div>
                <Modals modalShow={modalShow} toggle={toggle} />
            </Nav>
        </>
    ) 
}
const mapStateToProps = state => ({
    auth : state.auth
})
export default connect(mapStateToProps)(Sidebar)