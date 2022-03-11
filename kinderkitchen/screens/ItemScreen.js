import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";
import Item from "../Components/Item"
import dummyThiccIngredients from "./DummyData";
import HeaderComponent from "../Components/HeaderComponent";

var itemList = [];

const ItemScreen = (props) => {
  //Replace CATEGORY_NAME to Category when user clicks on specific field
  return (
    <View style={styles.container}>
      {props.category_name ? <HeaderComponent title={props.category_name} /> : <HeaderComponent title="CATEGORY_NAME" />/*If no title provided*/}
      <ScrollView style={{ flex: 1, margin: 5 }}>
        {itemList}
        <Item item_name="Milk" />
        {<Item />/*get dummydata to prop*/}
        <Item item_name="Cheese" />
        <Item />
      </ScrollView>

      <MyNavMenu />
    </View>
  );
};

const styles = StyleSheet.create(
  {
    container: {
      backgroundColor: "#56ff9f",
      flex: 1,
      justifyContent: "center",
    },
  });

export default ItemScreen;
