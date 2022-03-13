import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native-gesture-handler";

import Test2 from "../screens/Test2";
import LoginScreen from "../screens/LoginScreen";
import AccountScreen from "../screens/AccountScreen";
import CategoryScreen from "../screens/CategoryScreen";
import DonateScreen from "../screens/DonateScreen";

const MyNavMenu = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navmenu}>
      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate(CategoryScreen)}
        underlayColor="limegreen"
      >
        <Text>Category</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate(Test2)}
        underlayColor="limegreen"
      >
        <Text>Test2</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate(DonateScreen)}
        underlayColor="limegreen"
      >
        <Text>Donate</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate(AccountScreen)}
        underlayColor="limegreen"
      >
        <Text>Account</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => {
          alert("I will return to login screen for now");
          navigation.navigate(LoginScreen);
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
