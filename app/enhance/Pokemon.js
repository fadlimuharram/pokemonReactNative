import React from "react";
import Pokemon from "../screens/Pokemon";
import { connect } from "react-redux";
import {
  getDetailPokemon,
  deletePokemon,
  getAllPokemon
} from "../_redux/actions";

const mapStateToProps = state => {
  const data = {
    detail: state.pokemon.detail,
    isLoading: state.pokemon.isLoading,
    isLoggedIn: state.users.isLoggedIn
  };
  if (state.users.isLoggedIn) {
    data["access_token"] =
      state.users.access_token.type + " " + state.users.access_token.token;
  }

  return data;
};

export default connect(
  mapStateToProps,
  { getDetailPokemon, deletePokemon, getAllPokemon }
)(Pokemon);
