import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Provider } from "react-redux";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Dashboard from "./clients/Dashboard";
import ChangePassword from "./clients/ChangePassword";
import Manage from "./clients/Manage";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import Print from "./clients/Print";
import BaseComp from "./BaseComp";
import PrivateRoute from "./common/PrivateRoute";
import PrivateManageRoute from "./common/PrivateManageRoute";

import store from "../store";
import { loadUser } from "../actions/auth";
import SequentialPrint from "./clients/SequentialPrint";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <Route path="/dashboard/:tag" component={Dashboard} />
                  <PrivateManageRoute path="/manage" component={Manage} />
                  <PrivateRoute path="/change" component={ChangePassword} />
                  <PrivateManageRoute path="/print" component={Print} />
                  <PrivateManageRoute path="/start-print" component={SequentialPrint} />
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                  <Route path="/" component={BaseComp} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
