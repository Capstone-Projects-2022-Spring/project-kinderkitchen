import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ItemInfoComponent({ item, pressHandler }) {
  
  //placeholder to demonstrate Style sheet
  const statusValue = 1; //0:Good, 1: Soon 2: Bad

  //Status Handler Function

  return (
    <TouchableOpacity
      onLongPress={() => pressHandler(item.item_id)}
      onPress={() => {
        console.log(item)
        console.log(item.item_name + " Pressed!");
      }}
    >
      {statusValue === 2 ? (
        <Text style={[styles.item, Status.expired]}>{item.item_name}{item.expiration_date}</Text>
      ) : statusValue  === 0 ? (
        <Text style={[styles.item, Status.good]}>{item.item_name}{item.expiration_date}</Text>
      ) : (
        <Text style={[styles.item, Status.soon]}>{item.item_name}{item.expiration_date}</Text>
      )
      }

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
const Status = StyleSheet.create({
  good: {/*leave Deafault*/ },
  expired: {
    borderColor: "#ff0000",
    backgroundColor: "#ffc9c9",
    color: "#ff0000"
  },
  soon: {
    borderColor: "#ffe100",
    backgroundColor: "#fdffad",
    color: "#ffe100"
  },
});
