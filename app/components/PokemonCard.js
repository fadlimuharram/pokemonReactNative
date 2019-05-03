import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Card, CardItem, Left, Text, Body } from "native-base";
import { api_picture } from "react-native-dotenv";

const PokemonCard = ({ category, name, img, onPress }) => {
  // alert(`${api_picture}${img}`);
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <CardItem>
          <Left>
            <Body>
              <Text>{name}</Text>
              <Text note>{category}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{ uri: `${api_picture}${img}` }}
            style={{ height: 100, width: null, flex: 1 }}
          />
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default PokemonCard;
