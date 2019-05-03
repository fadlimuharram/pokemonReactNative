import React from "react";
import Loading from "../components/Loading";

class RefreshPokemons extends React.Component {
  componentDidMount() {
    this.props.navigation.navigate("App");
  }

  render() {
    return <Loading />;
  }
}

export default RefreshPokemons;
