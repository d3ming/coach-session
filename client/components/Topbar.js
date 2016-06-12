import React from 'react';
import { NavItem, Nav } from 'react-bootstrap';


var Topbar = function(props) {
    return (
        <Nav bsStyle="tabs" activeKey={1}>
          <NavItem eventKey={1} href='/'>Home</NavItem>
          <NavItem eventKey={2} disabled>Coach sessions for {props.clientName}</NavItem>
        </Nav>
    );
}

module.exports = Topbar;
