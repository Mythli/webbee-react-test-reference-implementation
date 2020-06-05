import { createSelector } from 'reselect';
import map from 'lodash/map';
import { getAllObjectTypeIdsSelector, getObjectTypeByIdSelector } from '../reducers/object-types.reducer';
import { getAllFieldTypeIdsSelector, getFieldTypeByIdSelector } from '../reducers/object-types-field.reducer';

export const getObjectTypes = createSelector(
  getAllObjectTypeIdsSelector,
  getObjectTypeByIdSelector,
  (typeIds, typesById) => {
    return map(typeIds, (datum) => {
      return typesById[datum];
    });
  }
);



export const getFieldTypeForObjectType = (state, objectTypeId) => {
  return state.objectTypes.byId[objectTypeId];
};


export const getFieldList = createSelector(
  getFieldTypeForObjectType,
  getFieldTypeByIdSelector,
  (
    objectType,
    objectFieldById
  ) => {
    const fieldIds = objectType?.fieldIds ?? [];
    return map(fieldIds, (datum) => objectFieldById[datum]);
  }
);

export const getAllFieldList = createSelector(
  getAllFieldTypeIdsSelector,
  getFieldTypeByIdSelector,
  (
    fieldIds,
    objectFieldById
  ) => {
    return map(fieldIds, (datum) => objectFieldById[datum]);
  }
);
