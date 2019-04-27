import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import NewPokemon from "../screens/NewPokemon";
import WithAuth from "../hoc/WithAuth";
import {
  getAllCategories,
  getAllTypes,
  postPokemon,
  getAllPokemon
} from "../_redux/actions";

const mapStateToProps = state => {
  return {
    isLoading: state.pokemon.isLoading,
    categories: state.pokemon.categories,
    types: state.pokemon.types
  };
};

const enhance = compose(
  WithAuth,
  connect(
    mapStateToProps,
    {
      getAllCategories,
      getAllTypes,
      postPokemon,
      getAllPokemon
    }
  )
);
export default enhance(NewPokemon);
