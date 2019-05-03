import React from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Picker } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import StatusBarCustom from "./StatusBarCustom";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import MultiSelect from "react-native-multiple-select";

class HeaderSearch extends React.Component {
  state = {
    toggleAdvanceSearch: false
  };

  toggleAdvSearch = () => {
    this.setState({
      toggleAdvanceSearch: !this.state.toggleAdvanceSearch
    });
  };

  renderCategories = () => {
    return this.props.categories.map(val => (
      <Picker.Item label={val.name} value={val.id} />
    ));
  };

  render() {
    return (
      <LinearGradient
        colors={["#6AA0F8", "#4767EA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.btnContainer}
      >
        <StatusBarCustom />
        <View style={styles.searchContainer}>
          <View style={styles.searchContent}>
            <Icon style={styles.searchIcon} name="search" size={20} />
            <TextInput
              style={styles.searchTxt}
              placeholder="Search"
              value={this.props.searchValue}
              onChangeText={this.props.onSearchChangeText}
            />
            <TouchableOpacity
              onPress={this.toggleAdvSearch}
              style={styles.toggleBtn}
            >
              <Icon
                name={
                  this.state.toggleAdvanceSearch ? "chevron-up" : "chevron-down"
                }
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.toggleAdvanceSearch && (
          <View style={styles.advContainer}>
            <View style={styles.typesContainer}>
              <MultiSelect
                hideTags
                items={this.props.types}
                uniqueKey="id"
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={this.props.onSelectedItemsChange}
                selectedItems={this.props.typesSelected}
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
                selectedValue={this.props.category_selected}
                onValueChange={this.props.onCategoryChange}
              >
                <Picker.Item label="Select Category" value={undefined} />
                {this.renderCategories()}
              </Picker>
            </View>
          </View>
        )}
      </LinearGradient>
    );
  }
}

export default HeaderSearch;

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    height: 80,
    justifyContent: "flex-end",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5
  },
  searchContent: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    width: "100%",
    height: 45
  },
  searchIcon: {
    color: "grey"
  },
  searchTxt: {
    width: "70%"
  },
  advContainer: {
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  }
});
