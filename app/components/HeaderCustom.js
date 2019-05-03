import React from "react";
import { StyleSheet, StatusBar, View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import StatusBarCustom from "./StatusBarCustom";
const HeaderCustom = ({ title }) => (
  <React.Fragment>
    <StatusBarCustom />

    <LinearGradient
      colors={["#6AA0F8", "#4767EA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.headerContainer}
    >
      <Text style={styles.txtAdd}>{title}</Text>
    </LinearGradient>
  </React.Fragment>
);

export default HeaderCustom;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4F65B6"
  },
  txtAdd: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
    color: "white"
  }
});
