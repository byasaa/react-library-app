import React, { Component } from 'react'
import {
  Sidebar,
  Navbar,
  AuthorsTable
} from '../containers/index'
import {Container, Col, Row} from 'reactstrap'
import "../styles/layout.css"


class Authors extends Component {

    render() {
        return (
            <>
              <Container fluid>
                <Row>
                <Col md={3} id="sidebar-wrapper" style={{ marginRight: '-15px' }}>
                  <Sidebar {...this.props} />
                </Col>
                <Col md={9} id="page-content-wrapper">
                    <Navbar {...this.props} />
                    <div className="body">
                      <AuthorsTable {...this.props} />
                    </div>
                  </Col>
                </Row>
              </Container>
            </>
          )
    }
}

export default Authors
