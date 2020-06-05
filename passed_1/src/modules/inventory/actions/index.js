import { createAction } from 'redux-actions';

export const ADD_INVENTORY =
  'objector.add.inventory';
export const addInventory = createAction(
  ADD_INVENTORY
);

export const MODIFY_INVENTORY_FIELD_VALUE =
  'objector.modify.inventory.field.value';
export const modifyInventory = createAction(
  MODIFY_INVENTORY_FIELD_VALUE
);

export const DELETE_INVENTORY =
  'objector.delete.inventory';
export const deleteInventory = createAction(
  DELETE_INVENTORY
);
