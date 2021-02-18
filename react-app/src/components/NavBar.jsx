import React, { useState, useRef, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap"
import logo from "../images/homepage/logo.png";

const NavBar = (props) => {
  const d3Container = useRef(null);

  const search = () => {
    console.log("search")
  }
  const searchChange = () => {
    console.log("searchChange")
  }


  const [dropdownExpanded, setDropdownExpanded] = useState(false)
  const dropdownToggle = () => {
    console.log(window.innerWidth)
    setDropdownExpanded(!dropdownExpanded)
  }

  const resetDropDown = () => {
    setDropdownExpanded(false)
  }

  useEffect(() => {
    if (props.data && d3Container.current) {

    }
  }, [props.data, d3Container.current]);

  return (
    <div className="d3-component" ref={d3Container}>

      <Navbar variant="dark" expand="lg">
        <Navbar.Brand className="navbar-brand" href="#home">
          {/* width="100%" fills parent exactly */}
          <img width="100%" src={logo} alt="" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={resetDropDown}/>
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="mr-auto">
            <Nav.Link href="#uk-property">UK Property</Nav.Link>
            <Nav.Link href="#project-2">Project 2</Nav.Link>
            <Nav.Link href="#project-3">Project 3</Nav.Link>
            <NavDropdown title="Resources" id="collasible-nav-dropdown" onClick={dropdownToggle}>
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            {dropdownExpanded && <div className="vs-10px"></div>}
          </Nav>
          <Form inline onSubmit={search}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2"
              onChange={searchChange} />
            <Button variant="outline-light" onClick={search}>Search</Button>
          </Form>
          <Nav>
            <Nav.Link href="#referral">Referral</Nav.Link>
            <Nav.Link href="#signin">Sign In</Nav.Link>
          </Nav>

        </Navbar.Collapse>

      </Navbar>

    </div>
  );
};

export default NavBar;
