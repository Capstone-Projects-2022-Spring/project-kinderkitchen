import React from "react";
import { View, StyleSheet, Text } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";

const Test1 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text>Hello, I'm page 1</Text>
      </View>
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
    backgroundColor: "skyblue",
    flex: 1,
    justifyContent: "center",
  },
});

export default Test1;
