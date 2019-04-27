import React from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import Login from "../enhance/Login";
import Register from "../enhance/Register";

export default createStackNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  }
});
