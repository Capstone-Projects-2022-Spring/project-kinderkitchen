import React, {useEffect, useState} from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Searchbar } from 'react-native-paper';
import Recipe from "../Components/Recipe";
import MyNavMenu from "../nav-bar/MyNavMenu";

const RecipeScreen = () => {
  const APP_ID = ''; //INSERT APP ID HERE!!!!!!!
  const API_KEY = ''; //INSERT API KEY HERE!!!!!!!

  const [recipeData, setRecipeData] = useState([]);
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState("fish");

  useEffect(() => {
    getRecipeData();
  }, [query]);

  const getRecipeData = async() => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`)
    const data = await response.json();
    setRecipeData(data.hits);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.searchBar}>
          <Searchbar style={styles.input} placeholder="Search Recipes" value={search} onChangeText={text => setSearch(text)} onIconPress={getSearch} onSubmitEditing={getSearch} />
        </View>
        <ScrollView style={styles.recipeList}>
          {recipeData.map(recipe =>(
            <Recipe
             key={recipe.recipe.label}
             title={recipe.recipe.label} 
             calories={recipe.recipe.calories}
             image={recipe.recipe.image}
             ingredients={recipe.recipe.ingredients} 
             shareAs={recipe.recipe.shareAs}/>
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
  btnTxt: {
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    width: "100%",
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
    backgroundColor: "tan"
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
