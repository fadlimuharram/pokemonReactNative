import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AuthLoading from "../enhance/AuthLoading";
import App from "./RootStack";
import AuthStack from "./AuthStack";

const AppContainer = createAppContainer(
  createSwitchNavigator({
    AuthLoading: { screen: AuthLoading },
    App: { screen: App },
    AuthStack: { screen: AuthStack }
  })
);

export default AppContainer;
