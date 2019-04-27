import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Content,
  Thumbnail,
  Form,
  Item,
  Label,
  Input,
  Button
} from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { api_picture } from "react-native-dotenv";
import { LogoutIcon, CameraIcon } from "../assets/svg";
import ImagePicker from "react-native-image-picker";
import Loading from "../components/Loading";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

class Profile extends React.Component {
  toLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <Container>
        <Content>
          <LinearGradient
            style={styles.content}
            colors={["#58C7FF", "#4F65B6"]}
          >
            <TouchableOpacity style={styles.setting} onPress={this.toLogout}>
              <LogoutIcon size="30" color="white" />
            </TouchableOpacity>

            <View style={styles.header}>
              <Thumbnail
                style={styles.imgStyle}
                source={{ uri: `${api_picture}no_avatar.jpg` }}
                large
              />

              <Text style={styles.headerTxt}>{this.props.user.username}</Text>
            </View>
          </LinearGradient>
        </Content>
      </Container>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: Dimensions.get("screen").height / 3,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTxt: {
    color: "white",
    marginTop: 20,
    fontSize: 20
  },
  setting: {
    alignSelf: "flex-end",
    padding: 10
  },
  imgStyle: {
    borderWidth: 2,
    borderColor: "white",
    padding: 2,
    width: 150,
    height: 150,
    marginTop: -50,
    borderRadius: 150
  },
  formInput: {
    padding: 10
  },
  itemForm: {
    marginBottom: 20,
    marginTop: 10,
    paddingTop: 10
  },
  btnEdit: {
    backgroundColor: "#4F65B6"
  },
  txtBtnEdit: {
    color: "white"
  },
  cameraStyle: {
    backgroundColor: "rgba(198, 200, 206, 0.5)",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -40,
    marginLeft: 100
  },
  btnUploadImg: {
    backgroundColor: "rgba(198, 200, 206, 0.5)",
    alignSelf: "center",
    padding: 10,
    marginBottom: 20,
    marginTop: -10
  },
  txtBtnUploadImg: {
    color: "white"
  },
  mapStyle: {
    width: "100%",
    height: 200,
    marginTop: 20
  }
});
