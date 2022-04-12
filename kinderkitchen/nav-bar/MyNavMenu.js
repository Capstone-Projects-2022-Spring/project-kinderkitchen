import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MyNavMenu = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navmenu}>
      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate("Category")}
        underlayColor="limegreen"
      >
        <Ionicons name="home-sharp" size={24} color="black" />
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate("Recipe")}
        underlayColor="limegreen"
      >
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={24}
          color="black"
        />
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate("Donate")}
        underlayColor="limegreen"
      >
        <MaterialCommunityIcons name="map-search" size={24} color="black" />
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.touchable}
        onPress={() => navigation.navigate("Account")}
        underlayColor="limegreen"
      >
        <MaterialCommunityIcons name="account" size={24} color="black" />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  navmenu: {
    flex: 0.05,
    borderWidth: 1,
    backgroundColor: "lightgray",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    paddingBottom: 20,
  },
  touchable: {
    flex: 1,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    width: 97,
    borderRadius: 4,
  },
});

export default MyNavMenu;
