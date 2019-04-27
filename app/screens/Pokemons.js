import React from "react";
import { View, FlatList } from "react-native";

import { Container, Content } from "native-base";
import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";

class Pokemons extends React.Component {
  componentDidMount() {
    this.props.navigation.addListener("didFocus", () => {
      this.props.getAllPokemon();
    });
  }
  _keyExtractor = (item, index) => item.id;

  toDetail = id => {
    this.props.navigation.navigate("Detail", {
      id
    });
  };

  renderItem = ({ item }) => (
    <PokemonCard
      img={item.image_url}
      name={item.name}
      category={item.categories.name}
      onPress={() => this.toDetail(item.id)}
    />
  );

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }
    return (
      <Container>
        <Content>
          <FlatList
            data={this.props.pokemons}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
          />
        </Content>
      </Container>
    );
  }
}
export default Pokemons;
