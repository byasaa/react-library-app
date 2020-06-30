import React from 'react'
import {
  Sidebar,
  Navbar,
  Content
} from './index'
import {Container, Col, Row} from 'reactstrap'
import "../styles/layout.css"

const Layout = () => {

  return (
    <>
      <Container fluid>
        <Row>
        <Col md={3} id="sidebar-wrapper" style={{ marginRight: '-15px' }}>
          <Sidebar/>
        </Col>
        <Col md={9} id="page-content-wrapper">
            <Navbar />
            <div className="body">
              <Content />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Layout
