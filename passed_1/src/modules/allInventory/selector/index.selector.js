import { createSelector } from 'reselect';
import map from 'lodash/map';
import { getAllInventoryIdsSelector, getInventoryByIdSelector } from '../../inventory/reducers/inventory.reducer';


export const getAllInventories = createSelector(
  getAllInventoryIdsSelector,
  getInventoryByIdSelector,
  (inventoryIds, inventoryById ) => {
    return map(inventoryIds, (datum) => {
      return inventoryById[datum];
    });
  }
);
