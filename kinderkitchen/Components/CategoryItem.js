import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

{
  /*   This is a class that is related to the content of the list (design + displaying ) */
}
export default function CategoryItem({
  categoryName,
  deleteCategoryFunction,
  editCategoryFunction,
  passingCategoryData,
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      //pressHandler(item.categoryKey)}
      onPress={() =>
        navigation.navigate("Items", { categoryName, passingCategoryData })
      }
    >
      <View style={styles.item}>
        <AntDesign
          style={styles.edit}
          name="edit"
          size={24}
          color="black"
          onPress={() => editCategoryFunction()}
        />
        <MaterialIcons
          style={styles.delete}
          name="delete"
          size={18}
          color="#333"
          onPress={() => deleteCategoryFunction(categoryName)}
          /*alert("Backend Delete Coming Soon!")}*/
        />
        <Text style={styles.itemText}>{categoryName}</Text>
      </View>
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
    flexDirection: "row",
    alignItems: "center",
  },
  /*Category name design */
  itemText: {
    marginLeft: 10,
  },
  /*Edit Icon design */
  edit: {
    marginRight: 80,
    left: 300,
  },
  /*Delete Icon design */
  delete: {
    right: 100,
  },
});
