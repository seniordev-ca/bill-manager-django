import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as ROLES from "../utils/const";

class BaseComp extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    if (isAuthenticated) {
      if (user && user.role === ROLES.ROLE_CUSTOMER)
        return <Redirect to={`/dashboard/${user.tag}`}/>;
      return <Redirect to="/manage" />;
    }
    return <Redirect to="/login" />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(BaseComp);
