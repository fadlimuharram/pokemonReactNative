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
import MapView, { Marker } from "react-native-maps";
import Loading from "../components/Loading";
import HeaderCustom from "../components/HeaderCustom";
import { MapIcon, SelectPictureIcon, TrashIcon } from "../assets/svg";
import ButtonCustom from "../components/ButtonCustom";
class NewPokemon extends React.Component {
  state = {
    name: "",
    latitude: "-6.2945981",
    longitude: "106.7216567",
    category: "",
    typesSelected: "",
    avatarSource: "",
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
  }

  postPokemon = () => {
    // alert(JSON.stringify(this.state));
    this.props.postPokemon(this.props.access_token, this.state);
    this.setState({
      name: "",
      latitude: "-6.2945981",
      longitude: "106.7216567",
      category: 0,
      typesSelected: "",
      avatarSource: ""
    });
    this.props.getAllPokemon();
    this.props.navigation.navigate("List");
  };

  deleteAvatarSource = () => {
    this.setState({
      avatarSource: ""
    });
  };

  generateEnableBtnNewPokemon = () => {
    const { name, category, avatarSource, typesSelected } = this.state;
    if (name.length === 0) return true;

    if (category.length === 0 || category === 0) return true;

    if (avatarSource === "") return true;

    if (typesSelected.length === 0) return true;

    return false;
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
      <Picker.Item label={val.name} value={val.id} style={styles.itemPicker} />
    ));
  };

  renderSelectedPicture = () => {
    return (
      this.state.avatarSource !== "" && (
        <React.Fragment>
          <Image
            style={styles.imgStyle}
            source={this.state.avatarSource}
            resizeMode="contain"
          />
        </React.Fragment>
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
        <HeaderCustom title={"Add New Pokemon"} />

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

            {/* <Button
              style={styles.btnSelectImg}
              onPress={this.selectPhotoTapped}
            >
              <Text style={styles.txtBtnSelectImg}>select image</Text>
            </Button> */}

            {/* <TouchableOpacity style={styles.btnPost}>
              <Line
              <Text style={styles.txtBtnPost}>
                  New Pokmenon {String(this.generateEnableBtnNewPokemon())}
                </Text>
            </TouchableOpacity>

            <Button
              disabled={this.generateEnableBtnNewPokemon()}
              onPress={this.postPokemon}
              style={styles.btnPost}
              full
            >
              <Text style={styles.txtBtnPost}>
                New Pokmenon {String(this.generateEnableBtnNewPokemon())}
              </Text>
            </Button> */}
            <View style={styles.inputContainer}>
              <ButtonCustom
                text="New Pokemon"
                onPress={this.postPokemon}
                disabled={this.generateEnableBtnNewPokemon()}
              />
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}
export default NewPokemon;

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
