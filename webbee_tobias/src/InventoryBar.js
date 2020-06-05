import React, { useState } from 'react';
import {connect} from "react-redux";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';
import {setActivePage, setInventoryTypeFilter} from "./store";

import {
    NavLink
} from "react-router-dom";

const Example = ({inventoryTypes, inventoryCanvas, setInventoryTypeFilter, setActivePage}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand>Objector</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem key={"__all"}>
                            <NavLink exact={true} to="/" className={"nav-link"}>All</NavLink>
                        </NavItem>
                        {inventoryTypes.map((it) => <NavItem key={it.id} ><NavLink className={"nav-link"} to={`/type/${it.id}`}>{it.inventoryType}</NavLink></NavItem>)}
                        <NavItem key={"__types"}>
                            <NavLink to="/types" className={"nav-link"}>Manage types</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

const mapStateToProps = ({inventoryTypes, inventoryCanvas}) => ({
    inventoryTypes, inventoryCanvas
});


export default connect(mapStateToProps, {setInventoryTypeFilter, setActivePage})(Example);

