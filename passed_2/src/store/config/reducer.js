import { handleActions } from "redux-actions";
import actions, { namespaceOptions } from "./actions";
import produce from "immer";

const reducer = handleActions(
  {
    [actions.addType]: (state, action) => {
      return { ...state, types: state.types.concat(action.payload) };
    },
    [actions.removeType]: (state, { payload }) => {
      const cardIndex = state.types.findIndex((card) => card.id === payload.id);
      if (cardIndex < 0) {
        return state;
      }
      return produce(state, (draft) => {
        draft.types = [
          ...state.types.slice(0, cardIndex),
          ...state.types.slice(cardIndex + 1),
        ];
      });
    },
    [actions.updateType]: (state, { payload: { id, update = {} } }) => {
      const cardIndex = state.types.findIndex((card) => card.id === id);
      if (cardIndex < 0) {
        return state;
      }
      return produce(state, (draft) => {
        Object.entries(update).forEach(([key, value]) => {
          draft.types[cardIndex][key] = value;
        });
      });
    },
  },
  {
    types: JSON.parse(localStorage.getItem("types") || "[]"),
  },
  namespaceOptions
);

export default reducer;
