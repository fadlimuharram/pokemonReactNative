import React from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  StatusBar
} from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right
} from "native-base";
import Loading from "../components/Loading";
import { api_picture } from "react-native-dotenv";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import StatusBarCustom from "../components/StatusBarCustom";
import LinearGradient from "react-native-linear-gradient";

class Pokemon extends React.Component {
  state = {
    selectedTab: "overview"
  };

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

  toHome = () => {
    this.props.navigation.navigate("List");
  };

  selectedTab = type => {
    this.setState({
      selectedTab: type
    });
  };

  renderSelected = () => {
    switch (this.state.selectedTab) {
      case "overview":
        return this.renderPokemon();
      case "map":
        return this.renderMap();
      default:
        return this.renderPokemon();
    }
  };

  renderPokemon = () => (
    <View style={styles.bodyContainer}>
      {/* <Text style={styles.txtTitle}>{this.props.detail.name}</Text> */}
      <View style={styles.pokeBg} />
      <Image
        source={{
          uri: `${api_picture}${this.props.detail.image_url}`
        }}
        style={styles.img}
      />
    </View>
  );

  renderMap = () => (
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
  );

  renderType = () => {
    if (this.props.detail.types) {
      let str = "";
      this.props.detail.types.forEach((val, i) => {
        str += val.name;

        if (i < this.props.detail.types.length - 1) {
          str += ", ";
        }
      });

      return str;
    } else {
      return "";
    }
  };

  render() {
    if (this.props.isLoading) {
      return <Loading />;
    }

    return (
      <Container>
        <LinearGradient
          colors={["#6AA0F8", "#4767EA"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.container}
        >
          <StatusBarCustom />
          <View style={styles.headerStyle}>
            <TouchableOpacity
              style={styles.containerBackIcon}
              onPress={this.toHome}
            >
              <Icon name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
            {this.props.isLoggedIn && (
              <React.Fragment>
                <View style={styles.btnContainer} header>
                  <Button style={styles.edtBtn} onPress={this.toEdit}>
                    <Icon name="edit" color="white" />
                  </Button>
                  <Button style={styles.delBtn} onPress={this.toDelete}>
                    <Icon name="trash-o" color="white" />
                  </Button>
                </View>
              </React.Fragment>
            )}
          </View>

          <ScrollView>
            <View>
              {this.renderSelected()}

              <View style={styles.content}>
                <Button disabled style={styles.category} rounded>
                  <Text style={styles.txtCategory}>
                    #{" "}
                    {this.props.detail.categories &&
                      this.props.detail.categories.name}
                  </Text>
                </Button>
              </View>

              <View style={styles.content}>
                <Text style={styles.txtName}>{this.props.detail.name}</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.typeContent}>
                  Type : {this.renderType()}{" "}
                </Text>
                {/* {this.renderType()} */}
                {/* <ScrollView horizontal={true}>{this.renderType()}</ScrollView> */}
              </View>

              <View style={styles.footerBtn}>
                <TouchableOpacity onPress={() => this.selectedTab("overview")}>
                  <Text style={styles.txtMenu}>Overview</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectedTab("map")}>
                  <Text style={styles.txtMenu}>Maps</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </Container>
    );
  }
}
export default Pokemon;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  mapStyle: {
    width: "100%",
    height: 320,
    marginBottom: 20,
    marginTop: 10
  },
  btnContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 10
  },
  edtBtn: {
    backgroundColor: "#F8B634",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  delBtn: {
    marginLeft: 10,
    backgroundColor: "#E03A3A",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  pokeBg: {
    height: 300,
    width: 300,
    backgroundColor: "rgba(239,240,241,0.5)",
    borderRadius: 300
  },
  img: {
    height: 300,
    width: 300,
    marginTop: -250
  },
  bodyContainer: {
    flexDirection: "column",
    alignItems: "center"
  },
  content: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center"
  },
  typeContent: {
    textAlign: "center"
  },
  category: {
    backgroundColor: "rgba(71,103,234,0.5)",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 0
  },
  txtCategory: {
    color: "black",
    fontSize: 12
  },
  txtName: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 50,
    fontWeight: "bold"
  },
  txtTitle: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10
  },
  typesStyle: {
    backgroundColor: "#4F65B6",
    marginRight: 5
  },
  locationTxt: {
    fontSize: 20,
    marginBottom: 5,
    marginTop: 25
  },
  headerStyle: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25
  },
  txtHeaderTItle: {
    color: "white",
    fontSize: 15,
    marginLeft: 10
  },
  containerBackIcon: {
    marginLeft: 10
  },
  footerBtn: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    marginTop: 30
  },
  txtMenu: {
    fontWeight: "bold"
  }
});
