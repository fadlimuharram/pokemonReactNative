import React from "react";
import { View, Image, ScrollView, StyleSheet, Alert } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import Loading from "../components/Loading";
import { api_picture } from "react-native-dotenv";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

class Pokemon extends React.Component {
  componentDidMount() {
    this.props.getDetailPokemon(this.props.navigation.getParam("id", ""));
  }

  toEdit = () => {
    const {
      id,
      name,
      latitude,
      longitude,
      category_id,
      types,
      image_url
    } = this.props.detail;
    this.props.navigation.navigate("Edit", {
      id,
      name,
      latitude,
      longitude,
      category_id,
      types,
      image_url,
      access_token: this.props.access_token || null
    });
  };

  toDelete = () => {
    Alert.alert("Hapus", "Yakin Akan Di Hapus", [
      {
        text: "Tidak",
        onPress: () => console.warn("NO Pressed"),
        style: "cancel"
      },
      {
        text: "Ya",
        onPress: () => {
          this.props.deletePokemon(
            this.props.access_token,
            this.props.detail.id
          );
          this.props.getAllPokemon();
          this.props.navigation.navigate("TabNav");
          // this.props.getCart(this.props.access_token);
          // this.props.navigation.navigate("MyCart");
        }
      }
    ]);
  };

  renderType = () =>
    this.props.detail.types &&
    this.props.detail.types.map(val => (
      <Button disabled rounded>
        <Text>{val.name}</Text>
      </Button>
    ));

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }
    return (
      <Container>
        <Content>
          <Card>
            <CardItem cardBody>
              <Image
                source={{ uri: `${api_picture}${this.props.detail.image_url}` }}
                style={{ height: 500, width: null, flex: 1 }}
              />
              {this.props.isLoggedIn && (
                <React.Fragment>
                  <Button onPress={this.toEdit}>
                    <Text>edit</Text>
                  </Button>
                  <Button onPress={this.toDelete}>
                    <Text>delete</Text>
                  </Button>
                </React.Fragment>
              )}
            </CardItem>
            <CardItem>
              <Body>
                <ScrollView horizontal={true}>{this.renderType()}</ScrollView>
                {/* <MapView
                  style={styles.mapStyle}
                  region={{
                    latitude: parseFloat(this.props.detail.latitude),
                    longitude: parseFloat(this.props.detail.longitude),
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003
                  }}
                /> */}
                <MapView
                  style={styles.mapStyle}
                  region={{
                    latitude: parseFloat(this.props.detail.latitude),
                    longitude: parseFloat(this.props.detail.longitude),
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: parseFloat(this.props.detail.latitude),
                      longitude: parseFloat(this.props.detail.longitude)
                    }}
                    title={this.props.detail.name}
                    description={this.props.detail.name}
                  />
                </MapView>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
export default Pokemon;

const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    height: 200,
    marginTop: 20
  }
});
