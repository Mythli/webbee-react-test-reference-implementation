/*
ToDo:
 - reference title fields by id so you can change field names without breaking tjis setting
 - remove state based routing from store
 - menu item active / not active
 */

import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import InventoryBar from "./InventoryBar";
import InventoryCanvas from "./InventoryCanvas";
import TypeCanvas from "./TypeCanvas";
import { Provider } from 'react-redux';
import {theStore} from './store';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";


const pageHandlers = {
    inventory_canvas: InventoryCanvas,
    type_canvas: TypeCanvas
};

const TypeFiltered = () => {
    let { typeId } = useParams();
    return <InventoryCanvas inventoryCanvas={{inventoryTypeFilter: typeId}}  />
};

const App = ({activePage}) => {
    return (
        <div className="app-container">
            <InventoryBar></InventoryBar>
            <Switch>
                <Route path="/types">
                    <TypeCanvas />
                </Route>
                <Route path={`/type/:typeId`}>
                    <TypeFiltered />
                </Route>
                <Route path="/">
                    <TypeFiltered />
                </Route>
            </Switch>
        </div>
    );
};

const mapStateToProps = ({activePage}) => ({
    activePage
});

const ConnectedApp = connect(mapStateToProps)(App);

function AppContainer() {
  return (
    <Provider store={theStore}>
        <Router>
            <ConnectedApp />
        </Router>
    </Provider>
  );
}

export default AppContainer;
