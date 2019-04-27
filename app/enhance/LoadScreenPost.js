import React from "react";
import LoadScreenPost from "../screens/LoadScreenPost";
import { connect } from "react-redux";

const mapStateToProsp = state => {
  return {
    isLoadingPost: state.pokemon.isLoading
  };
};
export default connect(mapStateToProsp)(LoadScreenPost);
