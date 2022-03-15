import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";

const DonateScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.body}></View>
      <MyNavMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#E8EAED",
    flex: 1,
    justifyContent: "center",
  },
});

export default DonateScreen;
