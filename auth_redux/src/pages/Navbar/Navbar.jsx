import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavbarPagesHome = () => {
  let navigate = useNavigate();
  const handleSignIn = () => navigate("/login");
  return (
    <>
      <Navbar bg="warning" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <b>Berita</b>
          </Navbar.Brand>
          <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
              <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <div className="d-flex justify-content-between">
                <Button variant="danger">Sign Up</Button>
                <Button onClick={handleSignIn} variant="primary" to="/login">
                  Sign In
                </Button>
              </div>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarPagesHome;
