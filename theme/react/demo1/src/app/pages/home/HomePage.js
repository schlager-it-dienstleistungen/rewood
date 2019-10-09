import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import GoogleMaterialPage from "./google-material/GoogleMaterialPage";
import ReactBootstrapPage from "./react-bootstrap/ReactBootstrapPage";
import DocsPage from "./docs/DocsPage";

export default function HomePage() {
  return (
    <Switch>
      {
        /* Redirect from root URL to /dashboard. */
        <Redirect exact from="/" to="/dashboard" />
      }
      <Route path="/builder" component={Builder} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/google-material" component={GoogleMaterialPage} />
      <Route path="/react-bootstrap" component={ReactBootstrapPage} />
      <Route path="/docs" component={DocsPage} />
      <Redirect to="/error/error-v1" />
    </Switch>
  );
}
