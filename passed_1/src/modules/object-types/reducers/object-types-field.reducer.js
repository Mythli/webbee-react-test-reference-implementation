import {
  ADD_OBJECT_FIELD_TYPE,
  MODIFY_OBJECT_FIELD_TYPE,
} from '../actions';
import uniq from 'lodash/uniq';

export const defaultState = {
  byId: {},
  allIds: []
};

export const objectTypesFieldReducer = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case ADD_OBJECT_FIELD_TYPE: {
      const { id, objectTypeId, inputType, name } = action.payload;
      const model = {
        id,
        objectTypeId,
        inputType,
        name: name || '',
        value: ''
      }
      return {
        ...state,
        byId: { ...state.byId, [id]: model },
        allIds: uniq([...state.allIds, id])
      };
    }
    case  MODIFY_OBJECT_FIELD_TYPE: {
      const { id, inputType, name } = action.payload;
      const oldState = {...state.byId[id]};
      oldState.name = name;
      oldState.inputType = inputType;
      return {
        ...state,
        byId: { ...state.byId, [id]: {...oldState} }
      };
    }
    default:
      return state;
  }
};

export const getFieldTypeByIdSelector = (state) => {
  return state.objectTypesField.byId;
};

export const getAllFieldTypeIdsSelector = (state) => {
  return state.objectTypesField.allIds;
};
