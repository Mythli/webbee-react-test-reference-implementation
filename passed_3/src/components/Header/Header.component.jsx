import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import MenuComponent from '../Menu/Menu.component';

function HeaderComponent () {
    return (
        <Navbar bg="dark" variant="dark" sticky="top" expand="md">
            <Navbar.Brand  as={ Link } to="/">
                Inventory Wiz
            </Navbar.Brand >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
                <MenuComponent />
            </Navbar.Collapse>
        </Navbar>
    )
}

export default HeaderComponent;