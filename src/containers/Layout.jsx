import React from "react";
import { Sidebar, Navbar, Content } from "./index";
import { Container, Col, Row } from "reactstrap";
import "../styles/layout.css";

const Layout = (props) => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={3} id="sidebar-wrapper" style={{ marginRight: "-15px" }}>
            <Sidebar {...props} />
          </Col>
          <Col md={9} id="page-content-wrapper">
            <Navbar {...props} />
            <div className="body">
              <Content {...props} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
