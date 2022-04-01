import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

import { getDatabase, onValue, set, get, ref, child, push, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import MyNavMenu from "../nav-bar/MyNavMenu";

const RecipeSaved = () => {
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    readSavedRecipes();
  }, []);

  function readSavedRecipes() {
    get(child(ref(getDatabase()), `users/${getAuth().currentUser.uid}/savedRecipes`)).then((snapshot) => {
      if (snapshot.exists()) {
        setRecipeData(snapshot.val())
        console.log(recipeData);
      } else {
        console.log("No data available");
        
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.body}>
        <Text>Saved Recipes</Text>

        <ScrollView style={styles.recipeList}>
          {recipeData.map((recipe) => (
            <Recipe
              key={recipe.title}
              title={recipe.title}
              calories={recipe.calories}
              image={recipe.image}
              ingredients={recipe.ingredients}
              shareAs={recipe.shareAs}
            />
          ))}
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
  recipeList: {
    borderWidth: 1,
    width: "100%",
    marginBottom: 5,
    backgroundColor: "tan",
  },
});

export default RecipeSaved;
