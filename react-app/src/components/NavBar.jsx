import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap"
import logo from "images/homepage/logo.png";

const MyNavbar = () => {

  const search = (e) => {
    e.preventDefault();
    console.log("search")
  }
  const searchChange = () => {
    console.log("searchChange")
  }

  return (
    <Navbar className="my-navbar" variant="dark" expand="xl">
      <Navbar.Brand className="brand" href="#home">
        {/* width="100%" fills parent exactly */}
        <img width="100%" src={logo} alt="" />
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse>

        <Nav className="mr-auto">
          <Nav.Link href="#uk-property">UK Property</Nav.Link>
          <Nav.Link href="#project-2">Project 2</Nav.Link>
          <Nav.Link href="#project-3">Project 3</Nav.Link>
          <NavDropdown title="Resources">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline className="form" onSubmit={search}>
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
  );
};

export default MyNavbar;
