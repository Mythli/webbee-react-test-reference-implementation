import { handleActions } from "redux-actions";
import actions, { namespaceOptions } from "./actions";
import produce from "immer";

const reducer = handleActions(
  {
    [actions.addItem]: (state, action) => {
      return { ...state, list: state.list.concat(action.payload) };
    },
    [actions.removeItem]: (state, { payload }) => {
      const cardIndex = state.list.findIndex((card) => card.id === payload.id);
      if (cardIndex < 0) {
        return state;
      }
      return produce(state, (draft) => {
        draft.list = [
          ...state.list.slice(0, cardIndex),
          ...state.list.slice(cardIndex + 1),
        ];
      });
    },
    [actions.updateItem]: (state, { payload: { id, update = {} } }) => {
      const cardIndex = state.list.findIndex((card) => card.id === id);
      if (cardIndex < 0) {
        return state;
      }
      return produce(state, (draft) => {
        Object.entries(update).forEach(([key, value]) => {
          draft.list[cardIndex][key] = value;
        });
      });
    },
  },
  {
    list: JSON.parse(localStorage.getItem("list") || "[]"),
  },
  namespaceOptions
);

export default reducer;
