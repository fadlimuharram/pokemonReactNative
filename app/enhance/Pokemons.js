import React from "react";
import { connect } from "react-redux";
import { getAllPokemon } from "../_redux/actions";
import Pokemons from "../screens/Pokemons";

const mapStateToProps = state => {
  return {
    pokemons: state.pokemon.data,
    isLoading: state.pokemon.isLoading
  };
};

export default connect(
  mapStateToProps,
  { getAllPokemon }
)(Pokemons);
