import React from "react";
import { View, StyleSheet, Text } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";

const Test2 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text>Hello, I'm page 2</Text>
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
    backgroundColor: "seagreen",
    flex: 1,
    justifyContent: "center",
  },
});

export default Test2;
