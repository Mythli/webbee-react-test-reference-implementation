import { combineReducers, createStore } from 'redux'
import categoryReducer from './category.reducer'
import inventoryReducer from './inventory.reducer'
import { debounce } from 'lodash';
import { loadState, saveState } from '../../utils';

const persistedState = loadState();

const store = createStore(
    combineReducers(
        {
            categoryReducer,
            inventoryReducer
        }
    ),
    persistedState
);
store.subscribe(
    debounce(() => {
        saveState(store.getState());
    }, 1000)
);

export default store;