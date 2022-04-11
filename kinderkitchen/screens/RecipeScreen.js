import { getAuth } from "firebase/auth";
import { getDatabase, get, ref, child } from "firebase/database";
import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";

const RecipeScreen = ({ navigation }) => {
  const DB = getDatabase();
  const currentUserID = getAuth().currentUser.uid;
  const [DBItems, setDBItems] = useState(readDBItems());
  function readDBItems() {
    get(child(ref(DB), `users/${currentUserID}/items/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDBItems(snapshot.val());
        } else {
          console.log("No data available");
          // ....
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.customBtn}
          onPress={() => navigation.navigate("Recipe Search")}
        >
          <Text>Search for Recipes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customBtn}
          onPress={() => navigation.navigate("Custom Recipe Search", { DBItems })}
        >
          <Text>Search for Recipes using your items</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customBtn}
          onPress={() => navigation.navigate("Saved Recipes")}
        >
          <Text>Saved Recipes</Text>
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

  customBtn: {
    backgroundColor: "darkturquoise",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    height: 50,
    width: "90%",
    borderWidth: 0.5,
    borderRadius: 4,
  },
});

export default RecipeScreen;
