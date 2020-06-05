import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { actions } from "../../store/config";
import TypeCard from "./typeCard";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  height: 100%;
  width: 100%;
  overflow: auto;
  > * {
    margin-right: 16px;
    margin-bottom: 16px;
    width: 320px;
  }
`;

class Config extends Component {
  render() {
    const { types = [], addType } = this.props;

    return (
      <Wrapper>
        {types.map((card, index) => {
          return (
            <div key={card.id}>
              <TypeCard id={card.id} />
            </div>
          );
        })}
        <div>
          <Button block variant="secondary" onClick={addType}>
            Add Type
          </Button>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return state.config;
};

const mapDispatchToProps = {
  addType: actions.addType,
};

export default connect(mapStateToProps, mapDispatchToProps)(Config);
