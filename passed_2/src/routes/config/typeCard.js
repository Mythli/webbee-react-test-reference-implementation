import React, { Component } from "react";
import {
  Card,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
  Form,
} from "react-bootstrap";
import { fieldTypes } from "../../constants";
import { connect } from "react-redux";
import { actions } from "../../store/config";
import produce from "immer";
import hash from "../../utils/hash";

class TypeCard extends Component {
  removeField = (index) => {
    const { id, fields } = this.props;
    this.props.updateCard({
      id,
      update: {
        fields: [...fields.slice(0, index), ...fields.slice(index + 1)],
      },
    });
  };

  updateFieldType = (index, type) => {
    const { id, fields } = this.props;
    this.props.updateCard({
      id,
      update: {
        fields: produce(fields, (draft) => {
          draft[index].type = type;
        }),
      },
    });
  };

  updateFieldName = (index, name) => {
    const { id, fields } = this.props;
    this.props.updateCard({
      id,
      update: {
        fields: produce(fields, (draft) => {
          draft[index].name = name;
        }),
      },
    });
  };

  addField = (type) => {
    const { id, fields } = this.props;
    this.props.updateCard({
      id,
      update: {
        fields: produce(fields, (draft) => {
          draft.push({
            name: "Field " + fields.length,
            type,
            key: hash(6), // doing this so that user can rename the column/field name and its value in the previous records remain intact
          });
        }),
      },
    });
  };

  render() {
    const {
      title,
      id,
      titleField,
      fields = [],
      removeCard,
      updateCard,
    } = this.props;

    return (
      <Card>
        <Card.Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
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
            <Form.Group>
              <Form.Label>Object type</Form.Label>
              <Form.Control
                placeholder=""
                value={title}
                onChange={(e) => {
                  updateCard({
                    id,
                    update: {
                      title: e.target.value,
                    },
                  });
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Object title</Form.Label>
              <Form.Control
                as="select"
                value={titleField}
                onChange={(e) => {
                  updateCard({
                    id,
                    update: {
                      titleField: e.target.value,
                    },
                  });
                }}
              >
                {fields.map(({ name, key }, index) => (
                  <option label={name} value={key} key={key}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Fields</Form.Label>
              {fields.map(({ name, type, key }, fieldIndex) => {
                return (
                  <InputGroup style={{ marginBottom: 12 }} key={key}>
                    <FormControl
                      placeholder="Field Name"
                      value={name}
                      onChange={(e) =>
                        this.updateFieldName(fieldIndex, e.target.value)
                      }
                    />

                    <DropdownButton
                      as={InputGroup.Append}
                      variant="secondary"
                      title={type.displayText}
                      id={`${id}-field-${fieldIndex}-dd`}
                    >
                      {fieldTypes.map((type) => (
                        <Dropdown.Item
                          onSelect={() => {
                            this.updateFieldType(fieldIndex, type);
                          }}
                          key={type.key}
                        >
                          {type.displayText}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Item
                        onSelect={() => this.removeField(fieldIndex)}
                        key={key}
                      >
                        Remove
                      </Dropdown.Item>
                    </DropdownButton>
                  </InputGroup>
                );
              })}
            </Form.Group>
            {/* add field button */}
            <Form.Group style={{ marginTop: 32 }}>
              <Dropdown>
                <Dropdown.Toggle
                  block
                  variant="secondary"
                  id={`${id}-add-field`}
                >
                  Add Field
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {fieldTypes.map((type) => (
                    <Dropdown.Item
                      onSelect={() => this.addField(type)}
                      key={type.key}
                    >
                      {type.displayText}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

const mapDispatchToProps = {
  removeCard: actions.removeType,
  updateCard: actions.updateType,
};

const mapStateToProps = (state, { id }) => {
  return state.config.types.find((card) => card.id === id);
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeCard);
