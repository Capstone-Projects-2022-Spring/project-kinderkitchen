import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import { useNavigation } from "@react-navigation/native";

{
  /*   This is a class that is related to the content of the list (design + displaying ) */
}
export default function TodoItem({ item, pressHandler }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onLongPress={() => pressHandler(item.key)}
      onPress={() => navigation.navigate("Items",{categoryName: item.text, categoryID: item.key})}
      >
          <View style={styles.item}>
              <MaterialIcons name='delete' size={18} color='#333' />
              <Text style={styles.itemText}>{item.text}</Text>
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
     flexDirection: 'row',
    alignItems: 'center',
    },
    itemText: {
        marginLeft: 10,
    }
});
