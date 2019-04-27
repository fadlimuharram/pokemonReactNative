import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import EditPokemon from "../screens/EditPokemon";
import WithAuth from "../hoc/WithAuth";
import {
  getAllCategories,
  getAllTypes,
  updatePokemon
} from "../_redux/actions";

const mapStateToProps = state => {
  return {
    isLoading: state.pokemon.isLoading,
    categories: state.pokemon.categories,
    types: state.pokemon.types,
    isLoadingUpdate: state.pokemon.updateLoading
  };
};

const enhance = compose(
  WithAuth,
  connect(
    mapStateToProps,
    {
      getAllCategories,
      getAllTypes,
      updatePokemon
      // postPokemon
    }
  )
);
export default enhance(EditPokemon);
