import React, { useState } from "react"
import Swal from "sweetalert2"
import { Link } from "react-router-dom";
import {Nav, NavItem, NavLink} from 'reactstrap'
import "../styles/layout.css"
import {Modals} from './index'

const Sidebar = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const toggle = () => setModalShow(!modalShow);
    const showModal = () => {
        setModalShow(!modalShow)
    }
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
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
                    <h4>USER </h4> <Link to='/login' onClick={handleLogout} >Logout</Link>
                </div>
                <div className="container">
                    <NavItem>
                        <NavLink>Explore</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink>History</NavLink>
                    </NavItem>
                    <NavItem onClick={showModal}>
                        <NavLink>Add Book</NavLink>
                    </NavItem>
                </div>
                <Modals modalShow={modalShow} toggle={toggle} />
            </Nav>
        </>
    ) 
}
export default Sidebar