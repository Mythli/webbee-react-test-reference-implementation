import { createActions } from "redux-actions";
import hash from "../../utils/hash";
import { fieldTypes } from "../../constants";

export const namespaceOptions = {
  prefix: "CONFIG",
};

const actions = createActions(
  {
    addType: () => {
      return {
        id: hash(),
        title: "",
        titleField: "model",
        fields: [
          {
            name: "Model",
            type: fieldTypes[0],
            key: "model",
          },
        ],
      };
    },
    removeType: (payload) => payload,

    // card actions
    updateType: (payload) => payload,
  },
  namespaceOptions
);

export default actions;
