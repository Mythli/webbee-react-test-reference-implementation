import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { objectTypesReducer } from './modules/object-types/reducers/object-types.reducer';
import { objectTypesFieldReducer } from './modules/object-types/reducers/object-types-field.reducer';
import { inventoryReducer } from './modules/inventory/reducers/inventory.reducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const reducer = combineReducers({
  objectTypes: objectTypesReducer,
  objectTypesField: objectTypesFieldReducer,
  inventory: inventoryReducer,
});

const middlewares= [];
middlewares.push(thunk);
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer);


export default () => {
  let store = createStore(persistedReducer, applyMiddleware(...middlewares))
  let persistor = persistStore(store)
  return { store, persistor }
}
