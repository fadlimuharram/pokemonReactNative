import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Picker,
  Button,
  Thumbnail
} from "native-base";
import MultiSelect from "react-native-multiple-select";
import ImagePicker from "react-native-image-picker";

import Loading from "../components/Loading";
class NewPokemon extends React.Component {
  state = {
    name: "",
    latitude: "-6.2945981",
    longitude: "106.7216567",
    category: undefined,
    typesSelected: "",
    avatarSource: null
  };

  componentDidMount() {
    this.props.getAllCategories();
    this.props.getAllTypes();
  }

  postPokemon = () => {
    // alert(JSON.stringify(this.state));
    this.props.postPokemon(this.props.access_token, this.state);
    this.setState({
      name: "",
      latitude: "-6.2945981",
      longitude: "106.7216567",
      category: undefined,
      typesSelected: "",
      avatarSource: null
    });
    this.props.getAllPokemon();
    this.props.navigation.navigate("LoadScreenPost");
  };

  onCategoryChange = val => {
    this.setState({
      category: val
    });
  };

  onSelectedItemsChange = typesSelected => {
    this.setState({ typesSelected });
  };

  selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };

        this.setState({
          avatarSource: source
        });
      }
    });
  };

  renderCategories = () => {
    return this.props.categories.map(val => (
      <Picker.Item label={val.name} value={val.id} />
    ));
  };

  renderSelectedPicture = () => {
    return (
      this.state.avatarSource && (
        <Thumbnail
          style={styles.imgStyle}
          source={this.state.avatarSource}
          large
        />
      )
    );
  };

  render() {
    if (this.props.isLoading || !this.props.categories || !this.props.types) {
      return <Loading />;
    }
    const { typesSelected } = this.state;

    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="name"
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
              />
            </Item>
            <Item>
              <Input
                placeholder="latitude"
                value={this.state.latitude}
                onChangeText={latitude => this.setState({ latitude })}
              />
            </Item>
            <Item>
              <Input
                placeholder="longitude"
                value={this.state.longitude}
                onChangeText={longitude => this.setState({ longitude })}
              />
            </Item>

            <Item>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.category}
                onValueChange={this.onCategoryChange}
              >
                {this.renderCategories()}
              </Picker>
            </Item>

            <MultiSelect
              hideTags
              items={this.props.types}
              uniqueKey="id"
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={typesSelected}
              selectText="Pick Items"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={text => console.log(text)}
              altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: "#CCC" }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />

            <Button
              style={styles.btnSelectImg}
              onPress={this.selectPhotoTapped}
            >
              <Text style={styles.txtBtnSelectImg}>select image</Text>
            </Button>

            {this.renderSelectedPicture()}
            {this.state.avatarSource && (
              <Button onPress={this.postPokemon} style={styles.btnPost} full>
                <Text style={styles.txtBtnPost}>New Pokmenon</Text>
              </Button>
            )}
          </Form>
        </Content>
      </Container>
    );
  }
}
export default NewPokemon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: 50,
    marginLeft: 15
  },
  buttonContainer: {
    padding: 15
  },
  buttonInner: {
    marginBottom: 15
  },
  labelText: {
    color: "#333",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 15
  },
  item: {
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#FFF"
  },
  label: {
    color: "#333"
  },
  itemSelected: {
    backgroundColor: "#333"
  },
  labelSelected: {
    color: "#FFF"
  },
  btnSelectImg: {
    backgroundColor: "#4F65B6",
    alignSelf: "center",
    padding: 10,
    marginTop: 20
  },
  txtBtnSelectImg: {
    color: "white"
  },
  btnPost: {
    marginTop: 20,
    backgroundColor: "#4F65B6"
  },
  txtBtnPost: {
    color: "white"
  },
  imgStyle: {
    alignSelf: "center"
  }
});
