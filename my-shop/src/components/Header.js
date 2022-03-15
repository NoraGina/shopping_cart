
import React from 'react';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = (props)=>{
    const location = useLocation();

    const isCurrentURL = (url) => {
      return location.pathname.toLowerCase() === url.toLowerCase();
    };
    let navigate = useNavigate();

    const goHome = () => {
      navigate("/");
    };
const logout = ()=>{
    localStorage.clear();
    goHome();
}



    return<div>
        <Navbar
          bg="dark"
          variant="dark"
          fixed="top"
      >
        <Container>
          {props.loggedUser && <div className="float-left">
            <Nav>
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
          {props.role &&<Nav>
            <Nav.Item>
              <Link to="/create-product" className={`nav-link ${isCurrentURL("/create-product") && 'disabled'}`}>
                Create product
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/products" className={`nav-link ${isCurrentURL("/products") && 'disabled'}`}>
                Products
              </Link>
            </Nav.Item>
            <Nav.Item>
            <Link to="/orders" className={`nav-link ${isCurrentURL("/orders") && 'disabled'}`}>
              Orders
            </Link>
          </Nav.Item>
              </Nav>}
              
           
          </div>}
          <div className="float-right">
            <Nav>
              <Nav.Item>
                <Link to="/register" className={`nav-link ${isCurrentURL("/register") && 'disabled'}`}>
                  Register
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/login" className={`nav-link ${isCurrentURL("/login") && 'disabled'}`}>
                  Login
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Button variant="dark" onClick={() =>logout()}>Logout</Button>
                  
                
              </Nav.Item>

              

            </Nav>
          </div>
        </Container>
      </Navbar>
    </div>
}
export default Header;