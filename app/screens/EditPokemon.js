import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
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
import { api_picture } from "react-native-dotenv";
import Loading from "../components/Loading";
class EditPokemon extends React.Component {
  state = {
    name: "",
    latitude: "",
    longitude: "",
    category: undefined,
    typesSelected: "",
    avatarSource: null,
    selectImg: null
  };

  componentDidMount() {
    this.props.getAllCategories();
    this.props.getAllTypes();
    // alert(this.props.navigation.getParam("name"));
    // const dt = {
    //   name: this.props.navigation.getParam("name"),
    //   latitude: this.props.navigation.getParam("latitude"),
    //   longitude: this.props.navigation.getParam("longitude"),
    //   category_id: this.props.navigation.getParam("category_id"),
    //   types: this.props.navigation.getParam("types")
    // };
    this.setState({
      name: this.props.navigation.getParam("name"),
      latitude: this.props.navigation.getParam("latitude"),
      longitude: this.props.navigation.getParam("longitude"),
      category: this.props.navigation.getParam("category_id"),
      selectImg: this.props.navigation.getParam("image_url", "")
    });
    // alert(JSON.stringify(dt));
  }

  postPokemon = () => {
    // alert(JSON.stringify(this.state));
    const id = this.props.navigation.getParam("id");

    this.props.updatePokemon(this.props.access_token, this.state, id);
    this.props.navigation.navigate("LoadScreen");
    // alert(this.props.navigation.getParam("access_token"));
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
    if (this.state.avatarSource) {
      // alert(JSON.stringify(this.state.avatarSource));

      return (
        <React.Fragment>
          <Thumbnail
            style={styles.imgStyle}
            source={this.state.avatarSource}
            large
          />
          <Button onPress={this.postPokemon} style={styles.btnPost} full>
            <Text style={styles.txtBtnPost}>Edit Pokmenon</Text>
          </Button>
        </React.Fragment>
      );
    } else if (this.state.selectImg) {
      return (
        <React.Fragment>
          <Thumbnail
            style={styles.imgStyle}
            source={{ uri: `${api_picture}${this.state.selectImg}` }}
            large
          />
          <Button onPress={this.postPokemon} style={styles.btnPost} full>
            <Text style={styles.txtBtnPost}>Edit Pokmenon</Text>
          </Button>
        </React.Fragment>
      );
    } else {
      return <Text>aa</Text>;
    }
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
          </Form>
        </Content>
      </Container>
    );
  }
}
export default EditPokemon;

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
