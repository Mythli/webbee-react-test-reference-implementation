import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import uniqid from 'uniqid';
import { getAllInventories } from '../selector/index.selector';
import { getAllFieldList } from '../../object-types/selectors/index.selector';
import { addInventory } from '../../inventory/actions'
import { InventoryTypeForm } from '../components/Inventory.form.component';
import { getObjectTypes } from "../../object-types/selectors/index.selector";
import Dropdown from "react-bootstrap/Dropdown";


class AllInventoryPageComponent extends PureComponent {
  _handleAddTypes = (objectTypeId, name) => {
    const { addInventory, allFields } = this.props;
    const id = uniqid();
    const objectFields = allFields.filter((datum) => datum.objectTypeId === objectTypeId );
    const fields = objectFields.map((datum) => {
      return {
          id: datum.id,
          name: datum.name,
          value: datum.value,
          type: datum.inputType
      }
    });
    addInventory({id, objectTypeId, title: name, fields });
  }

  render() {
    const { className, inventories, objectTypes } = this.props;
    return (
      <div className={className}>
        <div className={"action--strip"}>
          <Dropdown className={"action-dropdown"}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Add Item
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {objectTypes.map((datum, index) => {
                return <Dropdown.Item key={index} onClick={() => this._handleAddTypes(datum.id, datum.name)}>{datum.name}</Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="object-type">
          {inventories.map((datum) => {
            return (
              <InventoryTypeForm
                data={datum}
                key={datum.id}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
  const inventories = getAllInventories(state);
  const objectTypes = getObjectTypes(state);
  const allFields = getAllFieldList(state);
  return {
    inventories,
    objectTypes,
    allFields
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addInventory
    },
    dispatch
  );
};

export const AllInventoryPage =  styled(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(AllInventoryPageComponent))
)`
  .action--strip {
    height: 50px;
    background-color: #dedede;
    border-bottom: solid 1px #b9b9b9;
    display: flex;
    align-items: center;
    padding:0 10px;
    text-align: right;
    justify-content: flex-end;
  }
  .object-type {  
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
  }
  
`;
