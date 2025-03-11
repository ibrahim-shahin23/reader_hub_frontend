import React from 'react';
import { Container, Nav, Navbar, Button, Form } from 'react-bootstrap';
import logo from '../assets/logo1.png';

function Footer() {
  return (
    <Navbar expand="lg" className="p-0 bg-body-tertiary mt-5" fixed="bottom">
      <Container fluid className='ps-2 pb-2'>
      <Navbar.Brand className='p-0' href="#">
            <img src={logo} // Use the imported image
            alt="Logo"
            width="60"
            height="60"
            className="d-inline-block align-top" />
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="footer-navbar" />
        <Navbar.Collapse id="footer-navbar">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          <div className='rights me-auto mb-1'>
            &copy; 2025 Reader Hub. All rights reserved.
          </div>
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