/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/pages/auth/AuthPage`, `src/pages/home/HomePage`).
 */

import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import ErrorsPage from "./pages/errors/ErrorsPage";
import LogoutPage from "./pages/auth/Logout";
import { LayoutContextProvider } from "../_metronic";

export const Routes = withRouter(({ Layout, history }) => {
  const { isAuthorized, menuConfig } = useSelector(
    ({ auth, builder: { menuConfig } }) => ({
      menuConfig,
      isAuthorized: auth.user != null
    }),
    shallowEqual
  );

  return (
    /* Create `LayoutContext` from current `history` and `menuConfig`. */
    <LayoutContextProvider history={history} menuConfig={menuConfig}>
      <Switch>
        {!isAuthorized ? (
          /* Render auth page when user at `/auth` and not authorized. */
          <Route path="/auth" component={AuthPage} />
        ) : (
          /* Otherwise redirect to root page (`/`) */
          <Redirect from="/auth" to="/" />
        )}

        <Route path="/error" component={ErrorsPage} />
        <Route path="/logout" component={LogoutPage} />

        {!isAuthorized ? (
          /* Redirect to `/auth` when user is not authorized */
          <Redirect to="/auth" />
        ) : (
          <Layout>
            <HomePage />
          </Layout>
        )}
      </Switch>
    </LayoutContextProvider>
  );
});
