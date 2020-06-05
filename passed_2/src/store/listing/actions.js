import { createActions } from "redux-actions";
import hash from "../../utils/hash";

export const namespaceOptions = {
  prefix: "LISTING",
};

const actions = createActions(
  {
    addItem: ({ id }) => {
      return {
        id: hash(),
        typeId: id,
        values: {},
      };
    },
    removeItem: (payload) => payload,
    updateItem: (payload) => payload,
  },
  namespaceOptions
);

export default actions;
