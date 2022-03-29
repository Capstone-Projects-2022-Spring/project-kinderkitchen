import React from "react";
import { View, StyleSheet, Text } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";

const RecipeCustomSearchScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text>Custom Recipe Search</Text>
      </View>
      <MyNavMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: 5,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#E8EAED",
    flex: 1,
    justifyContent: "center",
  },
});

export default RecipeCustomSearchScreen;
