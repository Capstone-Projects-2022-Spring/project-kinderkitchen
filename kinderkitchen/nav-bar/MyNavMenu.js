import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native-gesture-handler";

const MyNavMenu = () => {
  const navigation = useNavigation();

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
        onPress={() => navigation.navigate("Test 2")}
        underlayColor="limegreen"
      >
        <Text>Test2</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate("Food Banks")}
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
