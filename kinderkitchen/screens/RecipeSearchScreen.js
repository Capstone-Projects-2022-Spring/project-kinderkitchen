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

  const itemNames = route.params;

  useEffect(() => {
    getRecipeData();
  }, [query]);

  const getRecipeData = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`
    );
    const data = await response.json();
    setRecipeData(data.hits);
  };

  const getSearch = (e) => {
    e.preventDefault();
    if (
      typeof itemNames != "undefined" &&
      itemNames != null &&
      itemNames.length != null &&
      itemNames.length > 0
    ) {
      //console.log(itemNames);
      setQuery(itemNames);
    } else {
      setQuery(search);
    }
    setSearch("");
  };

  function saveRecipe(recipeData) {
    const updates = {};
    updates[
      "users/" + getAuth().currentUser.uid + "/savedRecipes/" + recipeData.title
    ] = recipeData;
    return update(ref(getDatabase()), updates);
    // set(ref(getDatabase(), 'users/' + auth.currentUser.uid +'/savedRecipes/' + title), {
    //   title: title,
    //   calories: calories,
    //   image: image,
    //   ingredients: ingredients,
    //   shareAs: shareAs});
  }

  // function fillSearchBar(itemNames) {
  //   if (
  //     typeof itemNames != "undefined" &&
  //     itemNames != null &&
  //     itemNames.length != null &&
  //     itemNames.length > 0
  //   ) {
  //     console.log(itemNames);
  //     setSearch(itemNames);
  //   }
  // }

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
