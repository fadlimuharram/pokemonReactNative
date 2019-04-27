import React from "react";
import LoadScreen from "../screens/LoadScreen";
import { connect } from "react-redux";

const mapStateToProsp = state => {
  return {
    isLoadingUpdate: state.pokemon.updateLoading,
    isLoadingPost: state.pokemon.isLoading
  };
};
export default connect(mapStateToProsp)(LoadScreen);
