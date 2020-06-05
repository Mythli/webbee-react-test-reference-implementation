import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Col, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import { fieldTypes, FieldTypesEnum, generateID } from '../../../utils';

import { updateCategory, addNewField } from '../../../store/actions'

const CategoryComponent = ({ category, doCategoryUpdate, doAddField }) => {
    const categoryClone = cloneDeep(category);
    const id = categoryClone.id;
    const disableDelete = categoryClone.fields.length === 1;

    const onPropChange = useCallback((obj, prop, value) => {
        obj[prop] = value.nativeEvent.target.value;
    }, []);

    const onCategoryChange = useCallback((obj) => {
        doCategoryUpdate(id, obj);
    }, [id, doCategoryUpdate]);

    const onAddField = useCallback(() => {
        categoryClone.fields.push({
            name: '',
            id: generateID(),
            typeIndex: 0
        });
        doAddField(id, categoryClone)
    }, [id, doAddField, categoryClone])

    const onChangeFieldType = useCallback((fieldIndex, typeIndex) => {
        if (fieldTypes[typeIndex].id === FieldTypesEnum.DELETE) {
            categoryClone.fields.splice(fieldIndex, 1);
        } else {
            categoryClone.fields[fieldIndex].typeIndex = typeIndex;
        }
        doCategoryUpdate(id, categoryClone)
    }, [id, doCategoryUpdate, categoryClone])

    return <Col className="mb-3" xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
        <Card>
            <Card.Header className="px-3">
                <Card.Title className="mb-0">
                    <Form.Control
                        type="text"
                        placeholder="Enter Category Name"
                        defaultValue={categoryClone.name}
                        onKeyUp={ (value) => onPropChange(categoryClone, 'name', value)}
                        onBlur={onCategoryChange.bind(null, categoryClone)}
                        />
                </Card.Title>
            </Card.Header>
            <Card.Body>
                {
                    categoryClone.fields.map((field, i) => {
                        const index = i + 1;
                        return (
                            <Form.Group controlId={field.id} key={index}>
                                <Form.Label>{`Field ${index}`}</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        defaultValue={field.name}
                                        placeholder={`Enter Field ${index} name`}
                                        onKeyUp={ (value) => onPropChange(categoryClone.fields[i], 'name', value)}
                                        onBlur={onCategoryChange.bind(null, categoryClone)}
                                    />
                                    <DropdownButton
                                      as={InputGroup.Append}
                                      variant="outline-secondary"
                                      title={ fieldTypes[field.typeIndex]?.name || '' }
                                      id="input-group-dropdown-2"
                                    >
                                        {
                                            fieldTypes.filter((field) => !disableDelete || field.id !== FieldTypesEnum.DELETE).map((type, typeIndex) => (
                                                <Dropdown.Item key={type.id} onClick={ onChangeFieldType.bind(null, i, typeIndex) }>{ type.name }</Dropdown.Item>
                                            ))
                                        }
                                    </DropdownButton>
                                </InputGroup>
                            </Form.Group>
                        )
                    })
                }
            </Card.Body>
            <Card.Footer>
                <Button onClick={onAddField.bind(null)}>Add New Field</Button>
            </Card.Footer>
        </Card>
    </Col>
};

const mapDispatchToProps = (dispatch) => ({
    doCategoryUpdate: (id, category) => dispatch(updateCategory(id, category)),
    doAddField: (id, category) => dispatch(addNewField(id, category)),
})
export default connect(null, mapDispatchToProps)(CategoryComponent);
