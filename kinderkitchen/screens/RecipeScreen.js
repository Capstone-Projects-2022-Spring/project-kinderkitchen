import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";

const RecipeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.searchBar}>
          <TextInput style={styles.input} placeholder="Search Recipes" />
          <TouchableOpacity style={styles.userBtn}>
            <Text
              style={styles.btnTxt}
              onPress={() => navigation.navigate("Recipe Search")}
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.customBtn}
          onPress={() => navigation.navigate("Custom Recipe Search")}
        >
          <Text style={{ color: "#fff" }}>
            Search for Recipes using your items
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customBtn}
          onPress={() => navigation.navigate("Saved Recipes")}
        >
          <Text style={{ color: "#fff" }}>Saved Recipes</Text>
        </TouchableOpacity>
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

  searchBar: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    width: "70%",
    backgroundColor: "#fff",
    marginRight: 5,
    paddingLeft: 5,
  },
  userBtn: {
    backgroundColor: "#FFD700",
    height: "100%",
    width: "25%",
  },

  customBtn: {
    backgroundColor: "darkturquoise",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    height: 50,
    width: "90%",
    borderWidth: 0.5,
  },
});

export default RecipeScreen;
