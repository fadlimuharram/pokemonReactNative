import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Content,
  Header,
  Item,
  Input,
  Text,
  Button,
  Picker
} from "native-base";
import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";
import MapView, { Marker, AnimatedRegion, Animated } from "react-native-maps";
import { api_picture } from "react-native-dotenv";
import MultiSelect from "react-native-multiple-select";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import HeaderSearch from "../components/HeaderSearch";
import { UpdateMapIcon, PersonMapIcon } from "../assets/svg";

class Pokemons extends React.Component {
  state = {
    page: 1,
    search: "",
    initialRegion: {
      latitude: -6.2945981,
      longitude: 106.7216567,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    personLocation: {
      latitude: -6.2945981,
      longitude: 106.7216567
    },
    typesSelected: "",
    category_selected: undefined,
    toggleAdvanceSearch: false,
    mapTheme: [],
    nameTheme: "",
    isMapChange: false
  };

  componentDidMount() {
    // this.props.navigation.addListener("didFocus", () => {
    //   this.props.getAllPokemon(this.state.page);
    // });
    this.props.getAllPokemon(this.state.page);
    this.props.getAllTypes();
    this.props.getAllCategories();

    this.props.navigation.addListener("didFocus", () => {
      if (this.props.needRefreshMap) {
        this.setState({
          nameTheme: this.props.nameTheme,
          mapTheme: this.props.mapTheme,
          isMapChange: true
        });
        this.props.navigation.navigate("RefreshPokemons");
        this.props.refreshMapTrue();
      } else {
        this.setState({
          nameTheme: this.props.nameTheme,
          mapTheme: this.props.mapTheme,
          isMapChange: false
        });
      }
    });

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5
        };
        this.onRegionChange(region, region.latitude, region.longitude);
      },
      error => console.log(error)
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _keyExtractor = (item, index) => item.id;

  onRegionChange = (region, latitude, longitude) => {
    this.setState({
      personLocation: {
        latitude: latitude || this.state.initialRegion.latitude,
        longitude: longitude || this.state.initialRegion.longitude
      }
    });
  };

  onSelectedItemsChange = typesSelected => {
    this.setState({ typesSelected, page: 1 });
    this.props.getSearchPokemon(
      1,
      this.state.search,
      typesSelected,
      this.state.category_selected
    );
  };

  getPoke = () => {
    // alert(`${this.state.page}-${this.props.pagination.lastPage}`);
    if (this.state.page <= this.props.pagination.lastPage) {
      if (
        this.state.search !== "" ||
        Object.entries(this.state.typesSelected).length !== 0 ||
        this.state.category_selected !== ""
      ) {
        this.props.getSearchPokemon(
          this.state.page,
          this.state.search,
          this.state.typesSelected,
          this.state.category_selected
        );
      } else {
        this.props.getAllPokemon(this.state.page + 1);
      }

      this.setState({
        page: this.state.page + 1
      });
    }
  };

  searchPoke = search => {
    this.setState({
      search,
      page: 1
    });
    this.props.getSearchPokemon(
      1,
      search,
      this.state.typesSelected,
      this.state.category_selected
    );
  };

  // toggleAdvSearch = () => {
  //   this.setState({
  //     toggleAdvanceSearch: !this.state.toggleAdvanceSearch
  //   });
  // };

  onCategoryChange = val => {
    this.setState({
      category_selected: val
    });
    if (val) {
      this.props.getSearchPokemon(
        1,
        this.state.search,
        this.state.typesSelected,
        val
      );
    } else {
      this.props.getSearchPokemon(
        1,
        this.state.search,
        this.state.typesSelected
      );
    }
  };

  toDetail = id => {
    this.props.navigation.navigate("Detail", {
      id
    });
  };

  refreshMap = () => {
    this.props.navigation.navigate("RefreshPokemons");
    this.props.refreshMapTrue();
  };
  renderRefreshMap = () => {
    if (this.state.isMapChange) {
      return (
        <TouchableOpacity onPress={this.refreshMap}>
          <UpdateMapIcon size={50} />
        </TouchableOpacity>
      );
    }
  };

  renderCategories = () => {
    return this.props.categories.map(val => (
      <Picker.Item label={val.name} value={val.id} />
    ));
  };

  renderItem = ({ item }) => (
    <PokemonCard
      img={item.image_url}
      name={item.name}
      category={item.categories.name}
      onPress={() => {
        this.setState({
          initialRegion: {
            ...this.state.initialRegion,
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude)
          }
        });
        this.toDetail(item.id);
      }}
    />
  );

  renderMarker = () => {
    return (
      this.props.pokemons &&
      this.props.pokemons.map(val => {
        return (
          <Marker
            draggable
            coordinate={{
              latitude: parseFloat(val.latitude),
              longitude: parseFloat(val.longitude)
            }}
          >
            <Image
              source={{
                uri: `${api_picture}${val.image_url}`
              }}
              style={styles.imgMap}
            />
          </Marker>
        );
      })
    );
  };

  render() {
    if (!this.props.pokemons) {
      return <Loading />;
    }
    return (
      <Container>
        <HeaderSearch
          types={this.props.types}
          typesSelected={this.state.typesSelected}
          onSelectedItemsChange={this.onSelectedItemsChange}
          category_selected={this.state.category_selected}
          onCategoryChange={this.onCategoryChange}
          categories={this.props.categories}
          searchValue={this.state.searchValue}
          onSearchChangeText={search => {
            this.setState({ search });
            this.searchPoke(search);
          }}
        />
        {/* <Header searchBar rounded>
          <Item>
            <Icon style={styles.searchIcon} name="search" />
            <Input
              placeholder="Search"
              value={this.state.search}
              onChangeText={search => {
                this.setState({ search });
                this.searchPoke(search);
              }}
            />
            <TouchableOpacity
              onPress={this.toggleAdvSearch}
              style={styles.toggleBtn}
            >
              <Icon
                name={
                  this.state.toggleAdvanceSearch ? "chevron-up" : "chevron-down"
                }
              />
            </TouchableOpacity>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header> */}
        {/* {this.state.toggleAdvanceSearch && (
          <View style={styles.advContainer}>
            <View style={styles.typesContainer}>
              <MultiSelect
                hideTags
                items={this.props.types}
                uniqueKey="id"
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={this.state.typesSelected}
                selectText="Types"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={text => console.log(text)}
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#000"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: "#CCC" }}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
              />
            </View>
            <View style={styles.categoriesContainer}>
              <Picker
                mode="dropdown"
                style={styles.categoriesTxt}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                note={false}
                selectedValue={this.state.category_selected}
                onValueChange={this.onCategoryChange}
              >
                <Picker.Item label="Select Category" value={undefined} />
                {this.renderCategories()}
              </Picker>
            </View>
          </View>
        )} */}
        <View>{this.renderRefreshMap()}</View>
        <MapView
          style={styles.mapStyle}
          ref={mapView => {
            _mapView = mapView;
          }}
          region={{
            ...this.state.initialRegion,
            latitude: this.state.personLocation.latitude,
            longitude: this.state.personLocation.longitude
          }}
          customMapStyle={this.state.mapTheme}
        >
          {this.renderMarker()}
          <Marker
            coordinate={{
              latitude: this.state.personLocation.latitude,
              longitude: this.state.personLocation.longitude
            }}
          >
            <PersonMapIcon size={35} />
          </Marker>
        </MapView>
        <View style={styles.content}>
          <FlatList
            horizontal
            data={this.props.pokemons}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
            onEndReachedThreshold={0.1}
            onEndReached={e => {
              // alert("e");
              this.getPoke();
            }}
            ListFooterComponent={<View style={{ width: 15 }} />}
          />
        </View>
      </Container>
    );
  }
}
export default Pokemons;

const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    height: Dimensions.get("window").height
  },
  imgMap: {
    width: 30,
    height: 30
  },
  content: {
    width: "100%",
    height: Dimensions.get("window").width / 2,
    position: "absolute",
    bottom: 0
    // paddingBottom: 20
  },
  advContainer: {
    width: "100%",

    backgroundColor: "white"
  },
  typesContainer: {
    padding: 10
  },
  categoriesContainer: {
    paddingRight: 30,
    marginBottom: 20
  },
  toggleBtn: {
    marginRight: 10
  },
  searchIcon: {
    marginLeft: 10
  }
});
