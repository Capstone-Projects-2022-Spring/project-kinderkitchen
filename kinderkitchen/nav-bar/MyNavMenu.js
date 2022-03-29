import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
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

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => {
          signOut(auth).then(() => {
            // Sign-out successful.
            alert("You Are Now Signed-Out!\nCome Again User: " + user.email);
          }).catch((error) => {
            // An error happened.
            alert(error.code);
          });
          navigation.navigate("Login");
        }}
        underlayColor="limegreen"
      >
        <Text>Logout</Text>
      </TouchableHighlight>
    </View>
    
  );
};

const styles = StyleSheet.create({
  navmenu: {
    flex: 0.05,
    borderWidth: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    paddingBottom: 20
  },
  touchable: {
    flex: 1,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
  },
});

export default MyNavMenu;
