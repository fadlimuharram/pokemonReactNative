import React from "react";
import { connect } from "react-redux";
import {
  getAllPokemon,
  getSearchPokemon,
  getAllTypes,
  getAllCategories,
  refreshMapTrue
} from "../_redux/actions";
import Pokemons from "../screens/Pokemons";

const mapStateToProps = state => {
  return {
    pokemons: state.pokemon.data,
    pagination: state.pokemon.pagination,
    isLoading: state.pokemon.isLoading,
    types: state.pokemon.types,
    categories: state.pokemon.categories,
    mapTheme: state.maps.jsonData,
    nameTheme: state.maps.theme,
    needRefreshMap: state.maps.needRefresh
  };
};

export default connect(
  mapStateToProps,
  {
    getAllPokemon,
    getSearchPokemon,
    getAllTypes,
    getAllCategories,
    refreshMapTrue
  }
)(Pokemons);
