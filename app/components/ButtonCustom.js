import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
const ButtonCustom = ({ text, disabled, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      colors={disabled ? ["#F1F1F1", "#EAEAEA"] : ["#6AA0F8", "#4767EA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.btnContainer}
    >
      <Text style={disabled ? styles.disabledTxtBtnPost : styles.txtBtnPost}>
        {text}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

export default ButtonCustom;

const styles = StyleSheet.create({
  btnContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    paddingTop: 20
  },
  txtBtnPost: {
    color: "white"
  },
  disabledTxtBtnPost: {
    color: "#949898"
  }
});
