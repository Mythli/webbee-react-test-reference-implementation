import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import uniqid from 'uniqid';
import { getObjectType, getObjectFields, getInventories } from '../selector/index.selector';
import { addInventory } from '../actions'
import { InventoryTypeForm } from '../components/Inventory.form.component';

class InventoryPageComponent extends PureComponent {
  _handleAddTypes = () => {
    const { addInventory, objectType, objectFields } = this.props;
    const id = uniqid();
    const fields = objectFields.map((datum) => {
      return {
          id: datum.id,
          name: datum.name,
          value: datum.value,
          type: datum.inputType
      }
    });
    addInventory({id, objectTypeId: objectType.id, title: objectType.name, fields });
  }

  render() {
    const { className, objectType, inventories } = this.props;
    return (
      <div className={className}>
        <div className={"action--strip"}>
          <Button variant="primary" onClick={this._handleAddTypes}>Add Type</Button>
        </div>
        <div className="object-type">
          {inventories.map((datum) => {
            return (
              <InventoryTypeForm
                objectType={objectType}
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
const mapStateToProps = (state, {match}) => {
  const id = match.params.id;
  const objectType = getObjectType(state, id);
  const objectFields = getObjectFields(state,objectType?.fieldIds??[]);
  const inventories = getInventories(state,id);
  return {
    objectType,
    objectFields,
    inventories
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

export const InventoryPage =  styled(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(InventoryPageComponent))
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
