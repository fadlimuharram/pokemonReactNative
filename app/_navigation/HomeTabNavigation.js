import React from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Pokemons from "../enhance/Pokemons";
import NewPokemon from "../enhance/NewPokmon";
import Profile from "../enhance/Profile";
import { LogoIcon, PokemonEgg, ProfileIcon } from "../assets/svg";
import BottomTabNav from "../components/BottomTabNav";

export default createBottomTabNavigator(
  {
    List: {
      screen: Pokemons
    },
    New: {
      screen: NewPokemon
    },
    Profile: {
      screen: Profile
    }
  },
  {
    tabBarComponent: props => <BottomTabNav {...props} />,
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
      header: null
    }
  }
);
