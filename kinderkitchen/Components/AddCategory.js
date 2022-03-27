import React, { useState } from "react";
import { StyleSheet, SafeAreaView, TextInput, Button } from "react-native";

export default function AddCategory({ submitHandler, userID }) {
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={styles.footer}>
      <TextInput
        style={styles.TextInput}
        placeholder="Enter Category Name"
        onChangeText={(text) => setText(text)}
        placeholderTextColor="#fff"
        underlineColorAndroid="transparent"
      ></TextInput>

      <Button
        onPress={() => submitHandler(text, userID)}
        title="Add Category"
        style={styles.button}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    alignSelf: "stretch",
    color: "#fff",
    padding: 10,
    backgroundColor: "#252525",
    borderTopWidth: 2,
    borderTopColor: "#ededed",
  },
  button: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: "coral",
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  addButtonText: {
    backgroundColor: "#2196F3",
  },
});
