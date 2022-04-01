import { getDatabase, ref, remove } from "firebase/database";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";

const RecipeSaved = () => {

function deleteSavedRecipe(recipeName){
  alert(`Deleting ${recipeName}. This Cannot be Undone! \nSecondary Confirm To be Initialized`);
  remove(ref(getDatabase(), `users/${currentUserID}/savedRecipes/${recipeName}`));
}

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
