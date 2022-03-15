import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Platform,
  StatusBar,
} from "react-native";

export default function HeaderComponent(props) {
  if (props.title) {
    return (
      <SafeAreaView style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 15,
    paddingHorizontal: 20,
    backgroundColor: "coral",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
});
