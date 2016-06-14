import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';


var Topbar = function(props) {
    return (
        <Navbar>
          <Nav bsStyle="tabs" activeKey={1}>
            <NavItem eventKey={1} href='/'>Home</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={2} href='#'>Coach sessions for {props.clientName}</NavItem>
          </Nav>
        </Navbar>
    );
}

module.exports = Topbar;
