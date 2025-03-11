import React from 'react';
import { Container, Nav, Navbar, Button, Form } from 'react-bootstrap';

function Footer() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mt-5" fixed="bottom">
      <Container fluid>
        <Navbar.Brand href="#">Footer Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="footer-navbar" />
        <Navbar.Collapse id="footer-navbar">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="me-2"
              aria-label="Email"
            />
            <Button variant="outline-success">Subscribe</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Footer;