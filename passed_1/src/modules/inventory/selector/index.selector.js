import { createSelector } from 'reselect';
import map from 'lodash/map';
import { getFieldTypeByIdSelector } from '../../object-types/reducers/object-types-field.reducer';
import { getAllInventoryIdsSelector, getInventoryByIdSelector } from '../../inventory/reducers/inventory.reducer';

export const getObjectType = (state, objectTypeId) => {
  return state.objectTypes.byId[objectTypeId];
};


export const getFieldIds = (state, fieldIds) => {
  return fieldIds;
};

export const getObjectFields = createSelector(
  getFieldIds,
  getFieldTypeByIdSelector,
  (fieldIds, fieldById) => {
    return map(fieldIds, (datum) => {
      return fieldById[datum];
    });
  }
);

export const getObjectTypeId = (state, id) => {
  return id;
};

export const getInventories = createSelector(
  getObjectTypeId,
  getAllInventoryIdsSelector,
  getInventoryByIdSelector,
  (typeIds, inventoryIds, inventoryById ) => {
    const data = map(inventoryIds, (datum) => {
      return inventoryById[datum];
    });
    return data.filter((datum) => {
      return datum.objectTypeId === typeIds;
    })
  }
);
