import React, { useState } from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.min.css";
import Modals from "../components/Modal";

const Sidebar = () => {
  const [modalShow, setModalShow] = useState(false);
  const toggle = () => setModalShow(!modalShow);
  const showModal = () => {
    setModalShow(!modalShow);
  };
  return (
    <SideNav
      onSelect={(selected) => {
        // Add your code here
      }}
    >
      <Toggle />
      <Nav defaultSelected="home">
        <NavItem eventKey="home">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Home</NavText>
        </NavItem>
        <NavItem eventKey="charts">
          <NavIcon>
            <i
              className="fa fa-fw fa-line-chart"
              style={{ fontSize: "1.75em" }}
            />
          </NavIcon>
          <NavText>Charts</NavText>
          <NavItem eventKey="charts/linechart">
            <NavText>Line Chart</NavText>
          </NavItem>
          <NavItem eventKey="charts/barchart">
            <NavText>Bar Chart</NavText>
          </NavItem>
        </NavItem>
        <NavItem eventKey="Add" onClick={showModal}>
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Add Book</NavText>
        </NavItem>
      </Nav>
      <Modals modalShow={modalShow} toggle={toggle} />
    </SideNav>
  );
};
export default Sidebar;
