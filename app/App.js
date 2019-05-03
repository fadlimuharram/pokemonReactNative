import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import AppContainer from "./_navigation/AppContainer";
import { store, persistore } from "./_redux/store";
import { PersistGate } from "redux-persist/integration/react";
/**
 * primary color dark: 4767EA
 * primary color light: 6AA0F8
 *
 */
type Props = {};
export default class App extends Component<Props> {
  renderLoading = () => (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistore} loading={this.renderLoading()}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
