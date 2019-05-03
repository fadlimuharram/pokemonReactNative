import React from "react";
import Profile from "../screens/Profile";
import { connect } from "react-redux";
import { logout, selectMapTheme } from "../_redux/actions";
const mapStateToProps = state => {
  return {
    user: state.users.data,
    listMapTheme: state.maps.listTheme,
    theme: state.maps.theme
  };
};

export default connect(
  mapStateToProps,
  { logout, selectMapTheme }
)(Profile);
