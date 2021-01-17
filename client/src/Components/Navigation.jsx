import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
const Navigation = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  const token = localStorage.getItem('userToken')


  return (
  
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">Grapgql</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          {!token ? (<Nav navbar>
            <NavItem>
              <NavLink to="/">Register</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
          </Nav>) : (
            <Nav navbar>
               <NavItem>
                <NavLink to="/todo">Todos</NavLink>
              </NavItem>
              <Button color="danger" onClick={() => localStorage.removeItem('userToken')}>Logout</Button>
            </Nav>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}

NavbarToggler.propTypes = {
  type: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
}

export default Navigation;