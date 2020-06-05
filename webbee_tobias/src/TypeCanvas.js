import React, { useState } from 'react';
import {connect} from "react-redux";
import {
    Button,
    ButtonToggle,
    Card,
    CardBody,
    CardHeader, DropdownItem, DropdownMenu, DropdownToggle,
    Form,
    FormGroup,
    Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown,
    Label,
    UncontrolledButtonDropdown
} from "reactstrap";

import { addType,
    removeType,
    addTypeField,
    removeTypeField,
    modifyTypeFieldName,
    modifyTypeFieldType,
    modifyTypeTitleField,
    modifyTypeName
} from './store';

import _ from 'lodash';

const inputTypes = [
    { title: 'Small text', type: 'text' },
    { title: 'Long text', type: 'textarea' },
    { title: 'Number', type: 'number' },
    { title: 'Date', type: 'date' },
];

const getInputTypeTitle = (field) => {
    const inputType = _.find(inputTypes, {type: field.type});
    return inputType ? inputType.title : 'Small text';
}

const FlexFieldConfig = ({field, removeTypeField, modifyTypeFieldName, modifyTypeFieldType}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
    const title = getInputTypeTitle(field);

    return (
        <InputGroup className={"flex-field-setting"}>
            <Input value={field.name} onChange={(e) => modifyTypeFieldName(e.target.value)} placeholder={"Enter field name"} />
            <InputGroupButtonDropdown className={"flex-field-type-select"} addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                <DropdownToggle caret>
                    {title}
                </DropdownToggle>
                <DropdownMenu>
                    {inputTypes.map((f, i) => <DropdownItem key={f.type+i}
                        onClick={() => modifyTypeFieldType(inputTypes[i].type)}>{f.title}</DropdownItem>)}
                    <DropdownItem key="__remove" onClick={removeTypeField}>Remove</DropdownItem>
                </DropdownMenu>
            </InputGroupButtonDropdown>
        </InputGroup>
    );
};

const TitleFieldSelector = ({inventoryType, fields, modifyTypeTitleField}) => {
    const id = _.camelCase(inventoryType.inventoryType+'TitleFieldInput');

    return (
        <FormGroup>
            <Label for={id}>Object Title</Label>
            <Input type="select" name={id} id={id} value={inventoryType.titleField} onChange={(e) => modifyTypeTitleField(e.target.value)}>
                {fields.map((f) => <option key={f.id} value={f.name}>{f.name}</option>)}
            </Input>
        </FormGroup>
    );
};

const TypeItem = ({inventoryType, removeType, modifyTypeTitleField, modifyTypeName,
                      addTypeField, ...otherProps}) => {

    const renderFlexFieldConfig = (field, fieldIndex) => {
        const boundActions = {
            removeTypeField: (...args) => otherProps.removeTypeField(fieldIndex, ...args),
            modifyTypeFieldName: (...args) => otherProps.modifyTypeFieldName(fieldIndex, ...args),
            modifyTypeFieldType: (...args) => otherProps.modifyTypeFieldType(fieldIndex, ...args),
        };

        return <FlexFieldConfig key={field.id} field={field} {...boundActions} />
    };

    const nameInputId = _.camelCase(inventoryType.inventoryType+'NameInput');

    return (
        <Card className="type-item">
            <CardHeader className="inventory-item-header">
                <div className="inventory-item-title">
                    {inventoryType.inventoryType}
                </div>
                <div className="inventory-item-actions">
                    <ButtonToggle close onClick={removeType} />
                </div>
            </CardHeader>
            <CardBody>
                <Form>
                    <FormGroup>
                        <Label for={nameInputId}>Object type</Label>
                        <Input type="text" name={nameInputId} id={nameInputId} value={inventoryType.inventoryType} onChange={(e) => modifyTypeName(e.target.value)} />
                    </FormGroup>

                    <TitleFieldSelector inventoryType={inventoryType} fields={inventoryType.fields} modifyTypeTitleField={modifyTypeTitleField} />

                    <FormGroup>
                        <Label>Fields</Label>
                        {inventoryType.fields.map(renderFlexFieldConfig)}
                    </FormGroup>

                    <UncontrolledButtonDropdown className={"add-field"}>
                        <DropdownToggle caret>
                            Add Field
                        </DropdownToggle>
                        <DropdownMenu>
                            {inputTypes.map((f,i) => <DropdownItem key={f.type+i}
                                onClick={() => addTypeField(f.type)}>{f.title}</DropdownItem>)}
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>

                </Form>
            </CardBody>
        </Card>
    )
};

const TypeCanvas = ({inventoryTypes, addType, ...otherProps}) => {
  const renderTypeItem = (inventoryType, inventoryIndex) => {
      const boundActions = {
          removeType: (...args) => otherProps.removeType(inventoryIndex, ...args),
          addTypeField: (...args) => otherProps.addTypeField(inventoryIndex, ...args),
          removeTypeField: (...args) => otherProps.removeTypeField(inventoryIndex, ...args),
          modifyTypeFieldName: (...args) => otherProps.modifyTypeFieldName(inventoryIndex, ...args),
          modifyTypeFieldType: (...args) => otherProps.modifyTypeFieldType(inventoryIndex, ...args),
          modifyTypeTitleField: (...args) => otherProps.modifyTypeTitleField(inventoryIndex, ...args),
          modifyTypeName: (...args) => otherProps.modifyTypeName(inventoryIndex, ...args),
      };

      return <TypeItem key={inventoryType.id} inventoryType={inventoryType} {...boundActions} />
  };

  return (
      <div className="inventory-container">
          {inventoryTypes.map(renderTypeItem)}

          <div className={"type-item"}>
            <Button className={"add-item"} color="secondary" onClick={() => addType()}>Add Type</Button>
          </div>
      </div>
  );
};

const mapStateToProps = ({inventoryTypes}) => ({
    inventoryTypes
});

export default connect(mapStateToProps, {addType,
    removeType,
    addTypeField,
    removeTypeField,
    modifyTypeFieldName,
    modifyTypeFieldType,
    modifyTypeTitleField,
    modifyTypeName
})(TypeCanvas);