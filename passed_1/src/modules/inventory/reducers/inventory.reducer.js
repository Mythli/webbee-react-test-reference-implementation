import uniq from 'lodash/uniq';
import {
  ADD_INVENTORY, MODIFY_INVENTORY_FIELD_VALUE,
  DELETE_INVENTORY
} from '../actions';


export const defaultState = {
  byId: {},
  allIds: []
};

export const inventoryReducer = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case ADD_INVENTORY: {
      const { id, objectTypeId, title, fields } = action.payload;
      const model = {
        id,
        objectTypeId,
        title,
        fields
      }
      return {
        ...state,
        byId: { ...state.byId, [id]: model },
        allIds: uniq([...state.allIds, id])
      };
    }
    case MODIFY_INVENTORY_FIELD_VALUE: {
      const { id, value, inventoryId } = action.payload;
      const cloneState = {...state.byId[inventoryId]};
      cloneState.fields = cloneState.fields.map((datum) => {
        if(datum.id === id){
          return {
            ...datum,
            value
          }
        }
        return {
          ...datum
        }
      });
      return {
        ...state,
        byId: { ...state.byId, [inventoryId]: {...cloneState} }
      };
    }
    case DELETE_INVENTORY: {
      const inventoryId = action.payload;
      const cloneState = {...state.byId};
      delete cloneState[inventoryId];
      return {
        ...state,
        byId: { ...cloneState },
        allIds: state.allIds.filter((id) => id != inventoryId)
      };
    }
    default:
      return state;
  }
};

export const getInventoryByIdSelector = (state) => {
  return state.inventory.byId;
};

export const getAllInventoryIdsSelector = (state) => {
  return state.inventory.allIds;
};
