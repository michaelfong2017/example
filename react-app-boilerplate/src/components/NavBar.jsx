import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap"
import logo from "images/homepage/robocore_bk.png";

const MyNavbar = () => {

  const search = (e) => {
    e.preventDefault();
    console.log("search")
  }
  const searchChange = () => {
    console.log("searchChange")
  }

  return (
    <Navbar className="my-navbar" variant="light" expand="xl">
      <Navbar.Brand className="brand" href="#home">
        {/* width="100%" fills parent exactly */}
        <img width="100%" src={logo} alt="" />
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse>

        <Nav className="mr-auto">
        <Nav.Link href="#temi-api">Temi API</Nav.Link>
          <Nav.Link href="#getting-started">Getting Started</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="Documentation">
            <NavDropdown.Item href="#overview">Overview</NavDropdown.Item>
            <NavDropdown.Item href="#reference">Reference</NavDropdown.Item>
            <NavDropdown.Item href="#samples">Samples</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#support">Support</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline className="form" onSubmit={search}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2"
            onChange={searchChange} />
          <Button variant="outline-dark" onClick={search}>Search</Button>
        </Form>
        <Nav>
          <Nav.Link href="#go-to-console">Go to console</Nav.Link>
          <Nav.Link href="#signin">Sign In</Nav.Link>
        </Nav>

      </Navbar.Collapse>

    </Navbar>
  );
};

export default MyNavbar;
