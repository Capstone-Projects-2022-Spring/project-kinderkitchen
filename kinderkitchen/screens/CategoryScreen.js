import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Button,
  ScrollView,
  SafeAreaView,
} from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";
import ItemScreen from "./ItemScreen";

const CategoryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
      </View>

      <View style={styles.body}>
        <ScrollView style={styles.scrollView}>
          {/* Both will lead to the same items screen until we differentiate them */}
          <TouchableHighlight
            style={styles.touchable}
            onPress={() => navigation.navigate(ItemScreen)}
          >
            <Text>Fridge</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.touchable}
            onPress={() => navigation.navigate(ItemScreen)}
          >
            <Text>Pantry</Text>
          </TouchableHighlight>
        </ScrollView>

        <Button
          title={"Add Category"}
          onPress={() => alert("Add Category function")}
        />
      </View>

      <MyNavMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#E8EAED",
    flex: 1,
    justifyContent: "center",
  },
  header: {
    height: 80,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "coral",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  touchable: {
    backgroundColor: "skyblue",
    paddingLeft: 5,
    marginBottom: 10,
    borderWidth: 1,
    height: 75,
  },
  scrollView: {
    borderWidth: 1,
    width: "100%",
    marginBottom: 20,
  },
});

export default CategoryScreen;
