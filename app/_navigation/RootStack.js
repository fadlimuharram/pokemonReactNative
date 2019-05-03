import React from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import TabNav from "./HomeTabNavigation";
import Pokemon from "../enhance/Pokemon";
import EditPokemon from "../enhance/EditPokemon";
import LoadScreen from "../enhance/LoadScreen";
import LoadScreenPost from "../enhance/LoadScreenPost";

export default createStackNavigator({
  TabNav: {
    screen: TabNav
  },
  Detail: {
    screen: Pokemon,
    navigationOptions: {
      headerVisible: false,
      header: null
    }
  },
  Edit: {
    screen: EditPokemon
  },
  LoadScreen: {
    screen: LoadScreen
  },
  LoadScreenPost: {
    screen: LoadScreenPost
  }
});
