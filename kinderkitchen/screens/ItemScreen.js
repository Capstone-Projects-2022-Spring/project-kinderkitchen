import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Alert, Pressable } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";
import Item from "../Components/Item"
import dummyThiccIngredients from "./DummyData";
import HeaderComponent from "../Components/HeaderComponent";



const ItemScreen = (props) => {
  //Props should contain a ItemsObj
  const [numItems, setNumItems] = useState(4);
  const[status, setStatus] = useState(0); //STATUS STATES (0: Good , 1: Aproaching EXP, 2: Expired)
  var itemList = [];

  //props.category name
  //props.category_id
  //props.obj?
  //props.item_name


  //For Loop to get all Items from (CATEGORY)
  function showItems() {
    for (let i = 1; i <= numItems; i++) {
      itemList.push(
        <View key={i}>
          <Item item_name={i} />
        </View>)
      console.log("Item: "  + i + " added");
    };
  }


  showItems()
  return (
    <View style={styles.container}>
      {props.category_name ? <HeaderComponent title={props.category_name} /> : <HeaderComponent title="CATEGORY_NAME" />/*If no title provided*/}
      <ScrollView style={{ flex: 1, margin: 5 }}>
        {itemList}
      </ScrollView>
      <Pressable style = {styles.button} onPress={()=>{setNumItems(numItems + 1 ); console.log("Button Press")}}>
        <Text style = {{textAlign: "center"}}>+ Add Item</Text>
      </Pressable >
      <MyNavMenu />
    </View>
  );
};

const styles = StyleSheet.create(
  {
    container: {
          backgroundColor: "#E8EAED",
      flex: 1,
      justifyContent: "center",
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginTop:10,
      margin: 20
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
  });

export default ItemScreen;
