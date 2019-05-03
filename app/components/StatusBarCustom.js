import React from "react";
import { StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";
const StatusBarCustom = () => (
  <LinearGradient
    colors={["#6AA0F8", "#4767EA"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  >
    <StatusBar translucent={true} backgroundColor={"transparent"} />
  </LinearGradient>
);

export default StatusBarCustom;
