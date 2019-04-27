import React from "react";
import Register from "../screens/Register";
import { connect } from "react-redux";
import { register } from "../_redux/actions";
export default connect(
  "",
  { register }
)(Register);
