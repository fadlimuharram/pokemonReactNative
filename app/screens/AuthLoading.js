import React from "react";
import { View, Text } from "react-native";

class AuthLoading extends React.Component {
  componentDidMount() {
    this.props.navigation.navigate("App");
  }

  render() {
    return (
      <View>
        <Text>authloadin...</Text>
      </View>
    );
  }
}
export default AuthLoading;
