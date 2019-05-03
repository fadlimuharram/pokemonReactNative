import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Picker,
  Button,
  Thumbnail,
  Label
} from "native-base";
import MultiSelect from "react-native-multiple-select";
import ImagePicker from "react-native-image-picker";
import { api_picture } from "react-native-dotenv";
import Loading from "../components/Loading";
import MapView, { Marker } from "react-native-maps";
import { MapIcon, SelectPictureIcon, TrashIcon } from "../assets/svg";

class EditPokemon extends React.Component {
  state = {
    name: "",
    latitude: -6.2945981,
    longitude: 106.7216567,
    category: undefined,
    typesSelected: "",
    avatarSource: null,
    selectImg: null,
    initialRegion: {
      latitude: -6.2945981,
      longitude: 106.7216567,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    initPoint: {
      latitude: -6.2945981,
      longitude: 106.7216567
    }
  };

  componentDidMount() {
    this.props.getAllCategories();
    this.props.getAllTypes();

    const latitude = parseFloat(this.props.navigation.getParam("latitude"));
    const longitude = parseFloat(this.props.navigation.getParam("longitude"));

    this.setState({
      name: this.props.navigation.getParam("name"),
      latitude: this.props.navigation.getParam("latitude"),
      longitude: this.props.navigation.getParam("longitude"),
      category: this.props.navigation.getParam("category_id"),
      selectImg: this.props.navigation.getParam("image_url", ""),
      initPoint: {
        latitude,
        longitude
      },
      initialRegion: {
        ...this.state.initialRegion,
        latitude,
        longitude
      }
    });
    // alert(JSON.stringify(dt));
  }

  postPokemon = () => {
    // alert(JSON.stringify(this.state));
    const id = this.props.navigation.getParam("id");

    this.props.updatePokemon(this.props.access_token, this.state, id);
    this.props.navigation.navigate("List");
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

  deleteAvatarSource = () => {
    this.setState({
      avatarSource: ""
    });
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
        <Content style={styles.content}>
          <Form>
            <View style={styles.inputContainer}>
              <Text style={styles.txtInput}>Name</Text>
              <TextInput
                style={styles.inputTxt}
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.txtInput}>Category</Text>
              <Picker
                mode="dropdown"
                style={[styles.inputTxt, styles.pickerStyle]}
                selectedValue={this.state.category}
                onValueChange={this.onCategoryChange}
              >
                <Picker.Item label="select categories" value={0} />
                {this.renderCategories()}
              </Picker>
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.txtInput, styles.typesTxt]}>Types</Text>
              <MultiSelect
                hideTags
                items={this.props.types}
                uniqueKey="id"
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={typesSelected}
                selectText=""
                searchInputPlaceholderText="Search Items..."
                onChangeInput={text => console.log(text)}
                submitButtonText="Submit"
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: "#CCC" }}
                submitButtonColor="#CCC"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.txtPictureConteiner}>
                <Text style={[styles.txtInput, styles.typesTxt]}>
                  Choose Picture
                </Text>
                {this.state.avatarSource !== "" && (
                  <TouchableOpacity onPress={this.deleteAvatarSource}>
                    <TrashIcon color="red" size="20" />
                  </TouchableOpacity>
                )}
              </View>

              {this.state.avatarSource === "" && (
                <TouchableOpacity
                  style={styles.btnSelectImg}
                  onPress={this.selectPhotoTapped}
                >
                  <SelectPictureIcon color="black" size="100" />
                </TouchableOpacity>
              )}

              {/* <Button
                style={styles.btnSelectImg}
                onPress={this.selectPhotoTapped}
              >
                <Text style={styles.txtBtnSelectImg}>select image</Text>
              </Button> */}
              {this.renderSelectedPicture()}
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.txtInput, styles.typesTxt]}>Select Map</Text>

              <View style={styles.mapContainer}>
                <MapView
                  style={styles.mapStyle}
                  region={this.state.initialRegion}
                  onRegionChangeComplete={region => {
                    this.setState({
                      initialRegion: {
                        ...this.state.initialRegion,
                        latitude: region.latitude,
                        longitude: region.longitude
                      },
                      initPoint: {
                        latitude: region.latitude,
                        longitude: region.longitude
                      },
                      latitude: region.latitude,
                      longitude: region.longitude
                    });
                  }}
                >
                  <Marker coordinate={this.state.initPoint} />
                </MapView>
                <View style={styles.mapIconPosition}>
                  <MapIcon
                    style={styles.iconPosition}
                    marginTop={-25}
                    size={25}
                  />
                </View>
              </View>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}
export default EditPokemon;

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#FFF",
    paddingTop: 10
  },
  inputContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#F8F9FA",
    padding: 10
  },
  txtInput: {
    color: "black",
    fontSize: 15,
    marginLeft: 5
  },
  inputTxt: {
    fontSize: 20,
    fontWeight: "bold"
  },

  typesContainer: {
    padding: 20
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
    alignSelf: "center"
  },
  txtBtnSelectImg: {
    color: "white"
  },
  btnPost: {
    marginTop: 20,
    backgroundColor: "#4F65B6",
    marginBottom: 20
  },
  txtBtnPost: {
    color: "white"
  },
  imgStyle: {
    alignSelf: "center",
    marginTop: 20,
    width: 150,
    height: 150
  },
  mapStyle: {
    position: "absolute",
    width: "100%",
    height: 200,
    marginTop: 20,
    zIndex: 0
  },
  imgMap: {
    width: 30,
    height: 30
  },
  mapContainer: {
    flex: 1,
    width: "100%",
    height: 200,
    justifyContent: "center"
  },
  mapIconPosition: {
    position: "absolute",
    zIndex: 9,
    alignSelf: "center"
  },
  iconPosition: {
    marginTop: -100
  },
  pickerStyle: {
    marginTop: 10,
    marginBottom: 10
  },
  itemPicker: {
    fontSize: 20,
    fontWeight: "bold"
  },
  typesTxt: {
    marginBottom: 20
  },
  txtPictureConteiner: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
