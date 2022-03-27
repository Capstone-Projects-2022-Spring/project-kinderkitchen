import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { getAuth, signOut } from "firebase/auth";

const MyNavMenu = () => {
  const navigation = useNavigation();
  const auth = getAuth();

  const user = auth.currentUser;


  return (
    <View style={styles.navmenu}>
      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate("Category")}
        underlayColor="limegreen"
      >
        <Text>Category</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate("Recipe")}
        underlayColor="limegreen"
      >
        <Text>Recipe</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate("Donate")}
        underlayColor="limegreen"
      >
        <Text>Donate</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate("Account")}
        underlayColor="limegreen"
      >
        <Text>Account</Text>
      </TouchableHighlight>

      
    </View>
  );
};

const styles = StyleSheet.create({
  navmenu: {
    flex: 0.05,
    borderWidth: 1,
        backgroundColor: "#2196F3",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
  },
  touchable: {
    flex: 1,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    width: 99,
  },
});

export default MyNavMenu;
