/* eslint-disable react/forbid-prop-types */
import React from "react";
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Invoice from './Invoice';


const Dashboard = (props, context) =>
{
  const { auth } = props;
  const { tag } = props.match.params;

  if (auth.loginRedirect)
    return <Redirect to="/login" />;

  return <Invoice tag={tag}></Invoice>;
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return ({
    auth: state.auth
  });
};

export default connect(
  mapStateToProps
)(Dashboard);
