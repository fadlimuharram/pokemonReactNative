import React from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Pokemons from "../enhance/Pokemons";
import NewPokemon from "../enhance/NewPokmon";
import Profile from "../enhance/Profile";

export default createMaterialBottomTabNavigator({
  List: {
    screen: Pokemons
  },
  New: {
    screen: NewPokemon
  },
  Profile: {
    screen: Profile
  }
});
