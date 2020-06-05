import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import Config from "./config";
import listing from "./listing";
import { connect } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const RoutesWrapper = styled.div`
  height: 100%;
`;

class Routes extends Component {
  render() {
    const { types = [] } = this.props;

    return (
      <Wrapper>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Objector</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/items">All</Nav.Link>
              {types.map(({ id, title }) => {
                return (
                  <Nav.Link key={id} href={`/items/${id}`}>
                    {title}
                  </Nav.Link>
                );
              })}
              <Nav.Link href="/config">Manage types</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <RoutesWrapper>
          <Switch>
            <Route path="/items/:itemId" component={listing} />
            <Route path="/items" component={listing} />
            <Route path="/config" component={Config} />
            <Route path="/" component={() => <Redirect to="/items" />} />
          </Switch>
        </RoutesWrapper>
      </Wrapper>
    );
  }

  componentDidUpdate = () => {
    localStorage.setItem("list", JSON.stringify(this.props.list));
    localStorage.setItem("types", JSON.stringify(this.props.types));
  };
}

const mapStateToProps = (state) => {
  return {
    types: state.config.types,
    list: state.listing.list,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
