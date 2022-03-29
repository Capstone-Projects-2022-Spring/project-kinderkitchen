import React from "react";
import { View, StyleSheet, Text } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";

const RecipeSaved = () => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text>Saved Recipes</Text>
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

export default RecipeSaved;
