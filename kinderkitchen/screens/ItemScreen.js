import React from "react";
import { View, StyleSheet, ScrollView, Button, Alert } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";
import Item from "../Components/Item"
import dummyThiccIngredients from "./DummyData";
import HeaderComponent from "../Components/HeaderComponent";



const ItemScreen = (props) => {

  var itemList = [];

  //props.category name
  //props.category_id
  //props.obj?
  //props.item_name

  let NumITEMS = 5; //TEMP until Obj is functional to get item name

  //For Loop to get all Items from (CATEGORY)
  function showItems() {
    for (let i = 1; i <= NumITEMS; i++) {
      itemList.push(
        <View key={i}>
          <Item item_name={i} />
        </View>)
      console.log("Item: " + "DummyThicc" + i + " added");
    };
  }
  function addItems(){
    NumITEMS += 1;
    showItems();
  }


  showItems()
  return (
    <View style={styles.container}>
      {props.category_name ? <HeaderComponent title={props.category_name} /> : <HeaderComponent title="CATEGORY_NAME" />/*If no title provided*/}
      <ScrollView style={{ flex: 1, margin: 5 }}>
        {itemList}
      </ScrollView>
      <Button title=" + Add Item" onPress={()=>addItems()}/*needs Styling, Not sure how to Update the page*//>
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
