// import React, {useEffect, useState} from "react";
// import {
//   View,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { Searchbar } from 'react-native-paper';
// import Recipe from "../Components/Recipe";
// import MyNavMenu from "../nav-bar/MyNavMenu";

// import { getDatabase, ref, update } from "firebase/database";
// import { getAuth } from "firebase/auth";

// const RecipeScreen = () => {
//     const APP_ID = ""; //INSERT APP ID HERE!!!!!!!
//     const API_KEY = ""; //INSERT API KEY 

//   const [recipeData, setRecipeData] = useState([]);
//   const [search, setSearch] = useState('')
//   const [query, setQuery] = useState("fish");

//   useEffect(() => {
//     getRecipeData();
//   }, [query]);

import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";

//   function saveRecipe(recipeData){
//     const updates = {};
//     updates['users/' + getAuth().currentUser.uid +'/savedRecipes/' + recipeData.title] = recipeData;
//     return update(ref(getDatabase()), updates);
//     // set(ref(getDatabase(), 'users/' + auth.currentUser.uid +'/savedRecipes/' + title), {
//     //   title: title, 
//     //   calories: calories, 
//     //   image: image, 
//     //   ingredients: ingredients, 
//     //   shareAs: shareAs});

//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.body}>
//         <View style={styles.searchBar}>
//           <Searchbar style={styles.input} placeholder="Search Recipes" value={search} onChangeText={text => setSearch(text)} onIconPress={getSearch} onSubmitEditing={getSearch} />
//         </View>
//         <ScrollView style={styles.recipeList}>
//           {recipeData.map(recipe =>(
//             <Recipe
//              key={recipe.recipe.label}
//              title={recipe.recipe.label} 
//              calories={recipe.recipe.calories}
//              image={recipe.recipe.image}
//              ingredients={recipe.recipe.ingredients} 
//              shareAs={recipe.recipe.shareAs}
//              saveRecipeFunction = {saveRecipe}/>
//           ))}
//         </ScrollView>

const RecipeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.customBtn}
          onPress={() => navigation.navigate("Recipe Search")}
        >
          <Text style={{ color: "#fff" }}>Search for Recipes</Text>
        </TouchableOpacity>

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
