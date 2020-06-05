import { createStore, combineReducers, applyMiddleware } from "redux";

import { reducer as configReducer } from "./config";
import { reducer as listingReducer } from "./listing";

const rootReducer = combineReducers({
  listing: listingReducer,
  config: configReducer,
});

const configureStore = () => {
  const middlewares = [];

  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  return store;
};

export default configureStore();
