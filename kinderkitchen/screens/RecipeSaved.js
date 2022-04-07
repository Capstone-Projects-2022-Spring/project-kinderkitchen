import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

import { getDatabase, get, ref, child, remove } from "firebase/database";
import { getAuth } from "firebase/auth";

import MyNavMenu from "../nav-bar/MyNavMenu";
import Recipe from "../Components/Recipe";

const RecipeSaved = () => {
  const [recipeData, setRecipeData] = useState([]);
  const auth = getAuth();
  const db = getDatabase();
  const dbRef = ref(db);

  useEffect(() => {
    readSavedRecipes();
  }, []);

  function deleteSavedRecipe(recipeName) {
    alert(
      `Deleting ${recipeName}. This Cannot be Undone! \nSecondary Confirm To be Initialized`
    );
    remove(ref(db, `users/${auth.currentUser.uid}/savedRecipes/${recipeName}`));
    //readSavedRecipes(); //This might Update page on each delete Needs to be tested.
  }

  const readSavedRecipes = async () => {
    get(
      child(
        ref(getDatabase()),
        `users/${getAuth().currentUser.uid}/savedRecipes/`
      )
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          setRecipeData(snapshot.val());
        } else {
          console.log("No data available");
          //......
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function displaySavedRecipes() {
    let items = [];
    for (var key in recipeData) {
      items.push(
        <Recipe
          key={key}
          title={key}
          calories={recipeData[key].calories}
          image={recipeData[key].image}
          ingredients={recipeData[key].ingredients}
          shareAs={recipeData[key].shareAs}
          deleteRecipeFunction={deleteSavedRecipe}
        />
      );
    }
    return items;
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text>Saved Recipes</Text>

        <ScrollView style={styles.recipeList}>
          {recipeData.length === 0
            ? null //alert("Undefined!")
            : displaySavedRecipes()}
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
