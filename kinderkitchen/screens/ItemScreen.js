import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";
import Item from "../Components/Item"
import dummyThiccIngredients from "./DummyData";
import HeaderComponent from "../Components/HeaderComponent";

const ItemScreen = () => {
  //Replace CATEGORY_NAME to Category when user clicks on specific field
  return (
    <View style={styles.container}>
      <HeaderComponent title = "CATEGORY_NAME" />
      <ScrollView style={{margin: 5}}>
        <Item item_name="Milk" />
        <Item/><Item item_name="Cheese"/>
        <Item/>
      </ScrollView>{/*difficulty getting data to transfer to prop*/}
      
      <MyNavMenu />
    </View>
  );
};

// //function add all items from category
// function BootyThicc(){
//   for(int i=1; i<=3;i++){

//   }
// }
const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#56ff9f",
    flex: 1,
    justifyContent: "center",
  },
});

export default ItemScreen;
