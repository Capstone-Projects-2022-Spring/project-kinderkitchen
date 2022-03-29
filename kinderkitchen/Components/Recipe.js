import React, {useCallback} from 'react';
import { StyleSheet, Text, SafeAreaView, Image, Linking, Alert, Button, Pressable } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Recipe = ({ title, calories, image, ingredients, shareAs, saveRecipeFunction }) => {

  const recipeData = {
    title: title, 
    calories: calories, 
    image: image, 
    ingredients: ingredients, 
    shareAs: shareAs}

    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
          // Checking if the link is supported for links with custom URL scheme.
          const supported = await Linking.canOpenURL(url);
      
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }, [url]);
      
        return <Button color="brown" title={children} onPress={handlePress} />;
      };
      

      

    return (
        <SafeAreaView style={styles.safeView}>
                <Text style={styles.recipeName}>{title}</Text>
                <Text style={styles.calories}>{Math.round(calories)} Calories</Text>
                <Image source={{ uri: image }}
                       style={styles.recipeImage}
                ></Image>
                {ingredients.map(ingredient => (
                  <Text style={styles.ingredients}>{ingredient.text}</Text>
                ))}
                <OpenURLButton url={shareAs}>More about recipe</OpenURLButton>

                {/* Stores All 10 Search entries to DB - Help */}
                <TouchableOpacity onPress={() => {console.log(recipeData); saveRecipeFunction(recipeData);}}><Text>SAVE</Text></TouchableOpacity>
                
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
    recipeName: {
        justifyContent: "space-evenly",
        textAlign: "center",
        fontSize: 20,
        fontStyle: "italic",
        fontWeight: "bold"
    },
    calories: {
        justifyContent: "space-evenly",
        textAlign: "center",
        fontSize: 18,
    },
    recipeImage: {
        justifyContent: "space-evenly",
        alignSelf: "center",
        width: 300,
        height: 300,
        borderRadius: 5,
    },
    ingredients: {
        justifyContent: "flex-start",
        fontSize: 15,
        paddingLeft: 10,
        paddingTop: 5
    },
    safeView: {
        borderColor: "#C4A484",
        borderBottomWidth: 2.5,
        borderTopWidth: 10,
        borderLeftWidth: 10,
        borderRightWidth: 10,
    },
});

export default Recipe;