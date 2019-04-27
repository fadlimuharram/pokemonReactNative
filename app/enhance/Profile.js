import React from "react";
import Profile from "../screens/Profile";
import { connect } from "react-redux";
import { logout } from "../_redux/actions";
const mapStateToProps = state => {
  return {
    user: state.users.data
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Profile);
