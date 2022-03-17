import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";

const RecipeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.searchBar}>
          <TextInput style={styles.input} placeholder="Search Recipes" />
          <TouchableOpacity style={styles.userBtn}>
            <Text
              style={styles.btnTxt}
              onPress={() =>
                alert(
                  "This will search through recipes displayed on the screen from the API."
                )
              }
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.recipeList}>
          <TouchableOpacity style={styles.touchable}>
            <Text>Recipe 1</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.touchable}>
            <Text>Recipe 2</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.touchable}>
            <Text>Recipe 3</Text>
          </TouchableOpacity>
        </ScrollView>
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
  },
  userBtn: {
    backgroundColor: "#FFD700",
    height: "100%",
    width: "25%",
  },

  recipeList: {
    borderWidth: 1,
    width: "100%",
    marginBottom: 5,
  },
  touchable: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    height: 50,
  },
});

export default RecipeScreen;
