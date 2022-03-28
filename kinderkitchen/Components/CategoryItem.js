import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

{
  /*   This is a class that is related to the content of the list (design + displaying ) */
}
export default function CategoryItem({ categoryName, pressHandler }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onLongPress={() => pressHandler(item.categoryKey)}
      onPress={() => navigation.navigate("Items",{categoryName: categoryName})}
    >
      <Text style={styles.item}>{categoryName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginTop: 10,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    backgroundColor: "orange",
  },
});
