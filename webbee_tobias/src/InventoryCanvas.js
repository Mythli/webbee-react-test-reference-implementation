import React from "react";
import {connect} from "react-redux";
import {removeInventoryItem, changeInventoryItemFieldValue, addInventoryItem } from "./store";
import _ from 'lodash';
import {
    Button,
    ButtonToggle,
    Card,
    CardBody,
    CardHeader, DropdownItem, DropdownMenu, DropdownToggle,
    Form,
    FormGroup,
    Input,
    Label,
    UncontrolledButtonDropdown
} from "reactstrap";


const FlexField = ({type, name, value, onChange}) => {
    return (
        <FormGroup>
            <Label for="exampleEmail">{name}</Label>
            <Input type={type} name="exampleEmail" id="exampleEmail" onChange={onChange} value={value} />
        </FormGroup>
    );
};


const InventoryItem = ({className, inventoryItem, inventoryType, removeInventoryItem, changeInventoryItemFieldValue}) => {
    const renderField = (fieldMeta, i) => {
        return (
            <FlexField
                key={fieldMeta.id}
                name={fieldMeta.name}
                type={fieldMeta.type}
                value={inventoryItem.data[fieldMeta.name]}
                onChange={(e) => changeInventoryItemFieldValue(fieldMeta.name, e.target.value)}
            />
        );
    };

    const objectTitle = inventoryItem.data[inventoryType.titleField] ? inventoryItem.data[inventoryType.titleField] : 'No title';
    const title = `${inventoryType.inventoryType} - ${objectTitle}`;

    return (
        <Card className="inventory-item">
            <CardHeader className="inventory-item-header">
                <div className="inventory-item-title">
                    {title}
                </div>
                <div className="inventory-item-actions">
                    <ButtonToggle close onClick={removeInventoryItem} />
                </div>
            </CardHeader>
            <CardBody>
                <Form>
                    {inventoryType.fields.map(renderField)}
                </Form>
            </CardBody>
        </Card>
    );
}

const InventoryAdder = ({inventoryType, inventoryTypes, addInventoryItem}) => {
    return (
        <div className={"inventory-item"}>
            {inventoryType ?
                <Button className={"add-item"} color="secondary" onClick={() => addInventoryItem(inventoryType)}>Add Item</Button> :
                <UncontrolledButtonDropdown className={"add-item"}>
                    <DropdownToggle caret>
                        Add Item
                    </DropdownToggle>
                    <DropdownMenu>
                        {inventoryTypes.map((it) => <DropdownItem key={it.id}
                            onClick={() => addInventoryItem(it.id)}>{it.inventoryType}</DropdownItem>)}
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
            }
        </div>
    );
}

const InventoryCanvas = ({inventoryCanvas, inventoryItems, inventoryTypes, removeInventoryItem, changeInventoryItemFieldValue, addInventoryItem}) => {
    const renderInventoryItem = (inventoryItem, i) => {
        const inventoryType =  _.find(inventoryTypes, {id: inventoryItem.inventoryTypeId});

        const removeThisInventoryItem = () => {
            removeInventoryItem(i);
        };

        const changeThisInventoryItemFieldValue = (name, value) => {
            changeInventoryItemFieldValue(i, name, value);
        };

        return (
            <InventoryItem
                key={inventoryItem.id}
                inventoryItem={inventoryItem}
                inventoryType={inventoryType}
                removeInventoryItem={removeThisInventoryItem}
                changeInventoryItemFieldValue={changeThisInventoryItemFieldValue}
            />
        );
    };

    return (
        <div className="inventory-container">
            {inventoryItems.reduce((items, it, i) => {
                if(!inventoryCanvas.inventoryTypeFilter || it.inventoryTypeId === inventoryCanvas.inventoryTypeFilter) {
                    items.push(renderInventoryItem(it, i));
                }

                return items;
            }, [])}
            <InventoryAdder inventoryType={inventoryCanvas.inventoryTypeFilter} inventoryTypes={inventoryTypes} addInventoryItem={addInventoryItem} />
        </div>
    )
};

const mapStateToProps = ({inventoryItems, inventoryTypes}) => ({
    inventoryItems, inventoryTypes
});

export default connect(mapStateToProps, {removeInventoryItem, changeInventoryItemFieldValue, addInventoryItem})(InventoryCanvas);