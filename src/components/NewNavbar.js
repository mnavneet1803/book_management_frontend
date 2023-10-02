import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getAuthToken } from "./Auth";

import { Link  } from "react-router-dom";
import { useState } from "react";
import React from "react";

function NewNavbar() {
  const token = getAuthToken();
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Book Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/add/book">
                Add Book
              </Nav.Link>
            </Nav>
            
            <Nav>
            
              <Nav.Link as={Link} to="/signout/user">
                Signout
              </Nav.Link> 
                <Nav.Link as={Link} to="/signup/user">
              {"  "}
                SignUp
              </Nav.Link>
              <Nav.Link as={Link} to="/signin/user">
                {" "}
                SignIn{" "}
              </Nav.Link>
            
            </Nav>

           <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> 
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NewNavbar;
