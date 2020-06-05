import { ADD_ITEM, UPDATE_ITEM } from "../actionTypes";
import { generateID } from "../../utils"

const inventoryReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM:
      const id = generateID();
      state.push({
        ...action.item, id
      });
      break;
    case UPDATE_ITEM:
      const itemIndex = state.findIndex(({ id }) => id === action.id);
      state[itemIndex] = action.item;
      break;
    default:
      break;
  }
  return [...state]
}

export default inventoryReducer