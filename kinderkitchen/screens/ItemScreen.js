import React from "react";
import { View, StyleSheet, Text } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";

const ItemScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text>This is where the user will see their items!</Text>
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
    backgroundColor: "#56ff9f",
    flex: 1,
    justifyContent: "center",
  },
});

export default ItemScreen;
