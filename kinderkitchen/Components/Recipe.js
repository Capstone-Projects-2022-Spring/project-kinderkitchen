import React from 'react';
import { StyleSheet, Text, SafeAreaView, Image } from "react-native";

const Recipe = ({ title, calories, image }) => {
    return (
        <SafeAreaView>
                <Text style={styles.recipeName}>{title}</Text>
                <Text style={styles.calories}>{calories}</Text>
                <Image source={{ uri: image }}
                       style={styles.recipeImage}
                ></Image>
        </SafeAreaView>
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
    },
    recipeName: {
        justifyContent: "space-evenly",
        textAlign: "center",
        fontSize: 20,
    },
    calories: {
        justifyContent: "space-evenly",
        textAlign: "center",
        fontSize: 20,
    },
    recipeImage: {
        justifyContent: "space-evenly",
        alignSelf: "center",
        width: 300,
        height: 300,
        
        
    },
});

export default Recipe;