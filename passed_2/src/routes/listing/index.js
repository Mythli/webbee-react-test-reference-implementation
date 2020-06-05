import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Button, Dropdown } from "react-bootstrap";
import { actions } from "../../store/listing";
import ItemCard from "./itemCard";

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

class Listing extends Component {
  render() {
    const {
      list = [],
      types,
      match: {
        params: { itemId },
      },
      addItem,
    } = this.props;

    const itemType = types.find((item) => item.id === itemId);
    const items = itemId ? list.filter((item) => item.typeId === itemId) : list;

    return (
      <Wrapper>
        {items.map(({ id, typeId }) => {
          return (
            <div key={id}>
              <ItemCard
                key={id}
                id={id}
                type={types.find((type) => type.id === typeId)}
              />
            </div>
          );
        })}
        <div>
          {itemType ? (
            <Button block variant="secondary" onClick={() => addItem(itemType)}>
              Add item
            </Button>
          ) : (
            <Dropdown>
              <Dropdown.Toggle block variant="secondary" id={`add-item`}>
                Add item
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {types.map((type) => (
                  <Dropdown.Item key={type.key} onSelect={() => addItem(type)}>
                    {type.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return { list: state.listing.list, types: state.config.types };
};

const mapDispatchToProps = {
  addItem: actions.addItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
