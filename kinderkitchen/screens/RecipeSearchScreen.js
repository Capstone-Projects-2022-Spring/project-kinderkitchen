import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";

import MyNavMenu from "../nav-bar/MyNavMenu";
import Recipe from "../Components/Recipe";

import { getDatabase, ref, update } from "firebase/database";
import { getAuth } from "firebase/auth";

const RecipeSearchScreen = ({ route }) => {
  const APP_ID = ""; //INSERT APP ID HERE!!!!!!!
  const API_KEY = ""; //INSERT API KEY HERE!!!!!!!

  const [recipeData, setRecipeData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("fish");

  let itemNames = route.params;

  useEffect(() => {
    getRecipeData();
    fillSearchQuery();
  }, [query]);

  const getRecipeData = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`
    );
    const data = await response.json();
    setRecipeData(data.hits);

    // checks if no recipes were found when user inputs at least one item
    if (data.hits.length != null && data.hits.length === 0 && query != "") {
      alert("No recipes found.");
    }
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  function saveRecipe(recipeData) {
    const updates = {};
    updates[
      "users/" + getAuth().currentUser.uid + "/savedRecipes/" + recipeData.title
    ] = recipeData;
    alert("Saved " + recipeData.title);
    return update(ref(getDatabase()), updates);
  }

  // will search using the user selected items if navigated to from RecipeCustomSearchScreen
  function fillSearchQuery() {
    if (
      typeof itemNames != "undefined" &&
      itemNames != null &&
      itemNames.length != null &&
      itemNames.length > 0
    ) {
      let items = itemNames[0];
      for (let i = 1; i < itemNames.length; i++) {
        items = items + ", " + itemNames[i];
      }
      setQuery(items);
      route.params = null; // clear the params
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.searchBar}>
          <Searchbar
            style={styles.input}
            placeholder="Search Recipes"
            value={search}
            onChangeText={(text) => setSearch(text)}
            onIconPress={getSearch}
            onSubmitEditing={getSearch}
          />
        </View>
        <ScrollView style={styles.recipeList}>
          {recipeData.map((recipe) => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              shareAs={recipe.recipe.shareAs}
              saveRecipeFunction={saveRecipe}
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

  searchBar: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    marginRight: 5,
  },

  recipeList: {
    borderWidth: 1,
    width: "100%",
    marginBottom: 5,
    backgroundColor: "tan",
  },
});

export default RecipeSearchScreen;
