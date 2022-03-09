import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native-gesture-handler";

import LoginScreen from "../screens/LoginScreen";
import ItemScreen from "../screens/ItemScreen";


const MyNavMenu = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navmenu}>
      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate("Test1")}
        underlayColor="limegreen"
      >
        <Text>Test1</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate("Test2")}
        underlayColor="limegreen"
      >
        <Text>Test2</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate(ItemScreen)}
        underlayColor="limegreen"
      >
        <Text>Items</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => alert("I am a placeholder")}
        underlayColor="limegreen"
      >
        <Text>Test3</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => {
          alert("I will return to login screen for now");
          navigation.navigate(LoginScreen);
        }}
        underlayColor="limegreen"
      >
        <Text>Test4</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  navmenu: {
    flex: 0.05,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
  },
  touchable: {
    flex: 1,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
});

export default MyNavMenu;
