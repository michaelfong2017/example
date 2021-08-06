import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap"
import styled from "styled-components"

import variables from "styles/_variables.module.scss"

import logo from "images/homepage/logo.png";

import Spinner from "components/Spinner"

const StyledNavbar = styled(Navbar)`
  background-color: ${variables.white};
  && {
    padding: 0.5rem 1rem;
    border-style: solid;
    border-color: ${variables.borderGray};
    border-width: 0px;
    border-bottom-width: 2px;
  }
`;
const StyledBrand = styled(Navbar.Brand)`
  width: 375px;
  padding-top: 15px;
  padding-left: 3rem;
  margin-right: 2rem;
`;

const StyledNav = styled(Nav)`
    &&& a {
      color: ${variables.themeColor};

      font-size: 17px;
  
      &.dropdown-item {
        padding-left: 1rem;
        height: 40px;
      }
  
      &:hover {
        color: ${variables.themeHover};
      }
      &:active {
        background-color: transparent;
        color: ${variables.themeColor};
      }
    }
  
    .form {
      padding-top: 10px;
    }
  
    .btn {
      margin-bottom: 10px;
    }
`;
const StyledForm = styled(Form)`
  &&& > input {
    color: ${variables.themeColor};

    font-size: 17px;

    &:focus {
      border-color: #ced4da;
      box-shadow: 0 0 0 0.1rem ${variables.themeColor};
    }
    &:focus:active {
      box-shadow: 0 0 0 0.1rem rgb(52 58 64 / 50%);
    }
  }

  &&& > button {
    color: ${variables.themeColor};

    font-size: 17px;

    margin-right: 10px;

    &:hover {
      background-color: transparent;
      color: ${variables.themeHover};
    }
    &:focus {
      border-color: #ced4da;
      box-shadow: 0 0 0 0.1rem ${variables.themeColor};
    }
    &:focus:active {
      box-shadow: 0 0 0 0.1rem rgb(52 58 64 / 50%);
    }
  }
`;

// const signInOut = (user) => {
//   if (user) {
//     var title = user.email

//     return (
//       <NavDropdown title={title}>
//         <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
//         <NavDropdown.Item href="#preferences">Preferences</NavDropdown.Item>
//         <NavDropdown.Divider />
//         <NavDropdown.Item onClick={event => handleGoogleSignOut(event)}>Sign out</NavDropdown.Item>
//       </NavDropdown>)
//   }
//   else {
//     return <Nav.Link href="#login">Login</Nav.Link>
//   }
// }

const MyNavbar = () => { // displaying component
  const search = (e) => {
    e.preventDefault();
    // console.log("search")
  }
  const searchChange = () => {
    // console.log("searchChange")
  }

  return (
    <StyledNavbar variant="light" expand="xl">
      <StyledBrand href="/">
        {/* width="100%" fills parent exactly */}
        <img width="315px" height="70px" src={logo} alt="" />
      </StyledBrand>

      <Navbar.Toggle />
      <Navbar.Collapse>

        <StyledNav className="mr-auto">
          <Nav.Link href="#page-1">Page 1</Nav.Link>
        </StyledNav>

        {/* <StyledForm inline className="form" onSubmit={search}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2"
            onChange={searchChange} />
          <Button variant="outline-dark" onClick={search}>Search</Button>
        </StyledForm>

        <StyledNav>
          <Nav.Link href={process.env.PUBLIC_URL + "referral/"}>Referral</Nav.Link>
          <Nav.Link href={process.env.PUBLIC_URL + "#referral2"}>Referral 2</Nav.Link>
          {signInOut(user)}
        </StyledNav> */}

      </Navbar.Collapse>

    </StyledNavbar>
  );
};

export default MyNavbar;
