import React, { Component } from "react";
import { Sidebar, Navbar, GenresTable } from "../containers/index";
import { Container, Col, Row } from "reactstrap";
import "../styles/layout.css";

class Genres extends Component {
  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col md={3} id="sidebar-wrapper" style={{ marginRight: "-15px" }}>
              <Sidebar {...this.props} />
            </Col>
            <Col md={9} id="page-content-wrapper">
              <Navbar {...this.props} />
              <div className="body">
                <GenresTable {...this.props} />
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Genres;
