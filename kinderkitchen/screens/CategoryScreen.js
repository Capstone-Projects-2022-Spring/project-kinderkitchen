import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";
import ItemScreen from "./ItemScreen";

const CategoryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
      </View>
      <View style={styles.body}>
        <Text>Hello, I'm page 1</Text>
        <TouchableHighlight
          style={styles.touchable}
          onPress={() => navigation.navigate(ItemScreen)}
        >
          <Text>Items</Text>
        </TouchableHighlight>
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
    backgroundColor: "#E8EAED",
    flex: 1,
    justifyContent: "center",
  },
  header: {
    height: 80,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "coral",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  touchable: {
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 75,
  },
});

export default CategoryScreen;
