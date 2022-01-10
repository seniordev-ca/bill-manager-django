import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as ROLES from '../../utils/const';

const PrivateManageRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.isLoading) {
        return <h2>Loading...</h2>;
      } if (!auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else if (auth.user.role == ROLES.ROLE_MANAGER) {
        return <Component {...props} />;
      } else {
        return <h2>Not authorized to access this page.</h2>;
      }
    }}
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateManageRoute);
