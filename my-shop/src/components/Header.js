import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Header = (props)=>{
    const location = useLocation();

    const isCurrentURL = (url) => {
      return location.pathname.toLowerCase() === url.toLowerCase();
    };
    return<div>
        <Navbar
          bg="dark"
          variant="dark"
      >
        <Container>
          {props.loggedUser && <div className="float-left">
            <Nav>
              <Nav.Item>
                <Link to="/create-product" className={`nav-link ${isCurrentURL("/create-product") && 'disabled'}`}>
                  Create product
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/" className={`nav-link ${isCurrentURL("/") && 'disabled'}`}>
                  Home
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/cart" className={`nav-link ${isCurrentURL("/cart") && 'disabled'}`}>
                  Cart
                </Link>
              </Nav.Item>
            </Nav>
          </div>}
          <div className="float-right">
            <Nav>
              <Nav.Item>
                <Link to="/" className={`nav-link ${isCurrentURL("/") && 'disabled'}`}>
                  Register
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/login" className={`nav-link ${isCurrentURL("/login") && 'disabled'}`}>
                  Login
                </Link>
              </Nav.Item>

              

            </Nav>
          </div>
        </Container>
      </Navbar>
    </div>
}
export default Header;