import React  from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { getObjectTypes } from "../../modules/object-types/selectors/index.selector";

const HeaderComponent = ({
    className,
    objectTypes
  }) => {
  return (
      <div className={className}>
        <Navbar bg="light" expand="lg" className={"app-header--navigation "}>
          <Navbar.Brand>
            <Link to={`/`}>
              Objector
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to={`/`}>
                All
              </Link>
              {objectTypes.map((datum) => {
                return (
                  <Link key={datum.id} to={`/type/${datum.id}`}>
                    {datum.name}
                  </Link>
                )
              })}
              <Link to={`/types`}>
                Manage Types
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
  );
};

const mapStateToProps = (state) => {
  const objectTypes = getObjectTypes(state);
  return {
    objectTypes
  };
};

export const Header = styled(
  connect(mapStateToProps)(HeaderComponent)
)`
  background-color: #1976d2;
  min-height: 50px;
  display: flex;
  align-items: center;
  color: #fff;  
  padding: 0 10px;
  .navbar-nav{
    a {
      display: inline-block;
      margin-right: 15px;
    } 
  }
  .app-header--navigation {
    background: transparent!important;
     a {
        color: #fff;
     }
  }
`;
