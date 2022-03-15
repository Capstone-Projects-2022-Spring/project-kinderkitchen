import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ItemInfoComponent({item, pressHandler }) {

  return (
    <TouchableOpacity
      onLongPress={() => pressHandler(item.item_id)}
      onPress={() => {
        console.log(item)
        console.log(item.item_name + " Pressed!");
      }}
    >
      <Text style={styles.item}>{item.item_name}{item.expiration_date}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginTop: 10,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    backgroundColor: "gray"
  },
});
