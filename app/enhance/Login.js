import React from "react";
import Login from "../screens/Login";
import { connect } from "react-redux";
import { login } from "../_redux/actions";

const mapStateToProps = state => {
  return {
    isLoading: state.users.isLoading,
    access_token: state.users.access_token.token
  };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
