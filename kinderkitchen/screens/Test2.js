import React from "react";
import { View, StyleSheet, Button } from "react-native";

const Test2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Test2" onPress={() => navigation.navigate("Test2")} />
      <Button title="Test1" onPress={() => navigation.navigate("Test1")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gold",
    flex: 1,
    flexDirection: "row",

    justifyContent: "space-evenly",
    alignItems: "flex-end",
  },
});

export default Test2;
