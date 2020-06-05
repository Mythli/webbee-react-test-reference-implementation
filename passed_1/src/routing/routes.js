import React from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import { ROUTES } from "../constant";
import { PermissionDeniedComponent } from "../common/components/PermissionDenied.component";
import { Header } from "../common/components";
import { ObjectTypesPage } from '../modules/object-types/page'
import { InventoryPage } from '../modules/inventory/page'
import { AllInventoryPage } from '../modules/allInventory/page'

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path={ROUTES.HOME} exact>
          <AllInventoryPage />
        </Route>
        <Route render={({ match }) => <InventoryPage match={match} />} path={ROUTES.TYPE} exact />
        <Route path={ROUTES.TYPES} exact>
          <ObjectTypesPage />
        </Route>
        <Route path={"/*"} exact>
          <PermissionDeniedComponent />
        </Route>
      </Switch>
    </>
  );
};

export default withRouter(AppRoutes);
