import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { LogoIcon, PokemonEgg, ProfileIcon } from "../assets/svg";

const WrappedComponentIcon = ({ children }) => (
  <LinearGradient
    colors={["#6AA0F8", "#4767EA"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  >
    {children}
  </LinearGradient>
);

class BottomTabNav extends React.Component {
  state = {
    routes: [
      {
        name: "List",
        routeName: "List",
        icon: <LogoIcon size="25" color="#A7ACC1" />,
        pressedIcon: <LogoIcon size="25" color="#6AA0F8" />,
        isPressed: true
      },
      {
        name: "New",
        routeName: "New",
        icon: <PokemonEgg size="25" color="#A7ACC1" />,
        pressedIcon: <PokemonEgg size="25" color="#6AA0F8" />,
        isPressed: false
      },
      {
        name: "Profile",
        routeName: "Profile",
        icon: <ProfileIcon size="25" color="#A7ACC1" />,
        pressedIcon: <ProfileIcon size="25" color="#6AA0F8" />,
        isPressed: false
      }
    ]
  };

  toRouteName = val => {
    this.props.navigation.navigate(val.routeName);
    const newDataForPressed = this.state.routes.map(route => {
      if (route.routeName === val.routeName) {
        return {
          ...route,
          isPressed: true
        };
      } else {
        return {
          ...route,
          isPressed: false
        };
      }
    });

    this.setState({ routes: newDataForPressed });
  };

  renderRoute = () => {
    return this.state.routes.map(val => {
      return (
        <TouchableOpacity
          onPress={() => this.toRouteName(val)}
          style={styles.itemStyle}
        >
          {val.isPressed ? val.pressedIcon : val.icon}

          <Text style={val.isPressed ? styles.itemTxtSelected : styles.itemTxt}>
            {val.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };
  render() {
    return <View style={styles.container}>{this.renderRoute()}</View>;
  }
}

export default BottomTabNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  itemStyle: {
    alignItems: "center"
  },
  itemTxt: {
    marginTop: 5,
    color: "#A7ACC1",
    fontSize: 10
  },
  itemTxtSelected: {
    marginTop: 5,
    color: "#6AA0F8",
    fontSize: 10
  }
});
