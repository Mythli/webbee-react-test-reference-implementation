import React, { Component } from "react";
import { Card, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { actions } from "../../store/listing";
import produce from "immer";
import DatePicker from "react-datepicker";

class ItemCard extends Component {
  updateFieldValue = (key, value) => {
    const { id, values } = this.props;
    this.props.updateCard({
      id,
      update: {
        values: produce(values, (draft) => {
          draft[key] = value;
        }),
      },
    });
  };

  getFieldInput = (type, value, update) => {
    if (type.key === "number") {
      return (
        <Form.Control
          placeholder=""
          type="number"
          value={value}
          onChange={(e) => {
            update(e.target.value);
          }}
        />
      );
    }
    if (type.key === "longText") {
      return (
        <Form.Control
          as="textarea"
          rows="3"
          value={value}
          onChange={(e) => {
            update(e.target.value);
          }}
        />
      );
    }
    if (type.key === "date") {
      return (
        <DatePicker
          selected={value ? new Date(value) : new Date()}
          onChange={(e) => {
            update(e.toISOString().slice(0, 10));
          }}
        />
      );
    }
    return (
      <Form.Control
        placeholder=""
        value={value}
        onChange={(e) => {
          update(e.target.value);
        }}
      />
    );
  };

  render() {
    const { values, id, type, removeCard } = this.props;

    if (!type) {
      return null;
    }
    const { title, fields } = type;
    const { titleField = fields[0].key } = type;

    return (
      <Card>
        <Card.Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {title} - {values[titleField]}
          <span
            style={{
              fontSize: 40,
              height: 24,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              marginLeft: "auto",
              right: 0,
            }}
            onClick={() => removeCard({ id })}
          >
            ˟
          </span>
        </Card.Header>
        <Card.Body>
          <Form>
            {fields.map(({ name, key, type }) => {
              return (
                <Form.Group key={key}>
                  <Form.Label>{name}</Form.Label>
                  {this.getFieldInput(type, values[key], (value) => {
                    this.updateFieldValue(key, value);
                  })}
                </Form.Group>
              );
            })}
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

const mapDispatchToProps = {
  removeCard: actions.removeItem,
  updateCard: actions.updateItem,
};

const mapStateToProps = (state, { id }) => {
  return state.listing.list.find((card) => card.id === id);
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);
