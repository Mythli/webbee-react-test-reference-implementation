import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Card, Col, Dropdown, Form } from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import { fieldTypes, FieldTypesEnum } from '../../../utils';

import { updateItem, addItem } from '../../../store/actions'

const InventoryItem = ({ isNew = false, item, doItemUpdate, doItemAdd, categories }) => {
    const itemClone = cloneDeep(item);
    const [newItem, setNewItem] = useState(itemClone);

    const id = newItem.id || null;
    const selectedCategory = categories.find(({id: categoryId}) => categoryId === newItem.category);
    const fields = newItem.category ? selectedCategory.fields : [];
    const className = fields.length > 0 ? 'mb-3' : '';

    const onPropChange = useCallback((obj, prop, value) => {
        obj[prop] = value.nativeEvent.target.value;
    }, []);

    const onItemChange = useCallback(() => {
        if(id) {
            doItemUpdate(id, newItem);
        } else if (newItem.name && newItem.category) {
            doItemAdd({...newItem});
        }
    }, [id, doItemUpdate, doItemAdd, newItem]);

    const onChangeCategory = useCallback((category) => {
        newItem.category = category.id;
        if (id) {
            doItemUpdate(id, newItem)
        } else if (newItem.name) {
            doItemAdd(newItem);
        } else {
            setNewItem({...newItem});
        }
    }, [id, doItemUpdate, doItemAdd, newItem]);

    return <Col className="mb-3" xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
        <Card>
            <Card.Header className="px-3">
                <Card.Title className="mb-0">
                    <Form.Control
                        type="text"
                        placeholder="Enter Item Name"
                        defaultValue={newItem.name}
                        onKeyUp={ (value) => onPropChange(newItem, 'name', value)}
                        onBlur={onItemChange.bind(null)}
                        />
                </Card.Title>
            </Card.Header>
            <Card.Body>
            <Dropdown as={ButtonGroup} className={ `w-100 ${className}`}>
                <Dropdown.Toggle className="w-100"> { selectedCategory ? selectedCategory.name : 'Select a Category' } </Dropdown.Toggle>
                <Dropdown.Menu
                    variant="outline-secondary"
                >
                    {
                        categories.filter(({name}) => name).map((category) => (
                            <Dropdown.Item key={category.id} onClick={ onChangeCategory.bind(null, category) }>{ category.name }</Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
            {
                fields.map((field, i) => {
                    const name = field.name || `Field ${i + 1}`;
                    const type = fieldTypes[field.typeIndex].id;
                    const props = {};
                    if (type === FieldTypesEnum.TEXTAREA) { props.as = type; }
                    else { props.type = type; }

                    return (
                        <Form.Group controlId={field.id} key={i}>
                            <Form.Label>{name }</Form.Label>
                            <Form.Control
                                { ...props }
                                defaultValue={newItem.fields[field.id]}
                                placeholder={`Enter ${name}`}
                                onKeyUp={ (value) => onPropChange(newItem.fields, field.id, value)}
                                onBlur={onItemChange.bind(null)}
                            />
                        </Form.Group>
                    )
                })
            }
            </Card.Body>
        </Card>
    </Col>
};

const mapStateToProps = (state) => ({
    categories: state.categoryReducer
})

const mapDispatchToProps = (dispatch) => ({
    doItemUpdate: (id, item) => dispatch(updateItem(id, item)),
    doItemAdd: (item) => dispatch(addItem(item)),
})
export default connect(mapStateToProps, mapDispatchToProps)(InventoryItem);
