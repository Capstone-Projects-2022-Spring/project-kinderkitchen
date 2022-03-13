import React, { useState } from "react";
import { View, StyleSheet, Text, Touchable } from "react-native";

export default function item(props) {
  return (
    <View style={styles.containerBox}>
      <View style={styles.nameContainer}>
        {props.item_name ? (
          <Text>{props.item_name}</Text>
        ) : (
          <Text>DummyThiccItem</Text>
        )}
      </View>

      {/* These two views need to be on the left and right */}

      <View style={styles.statusContainer}>
        <Text>Status: ???</Text>
        {/* Will need a function to determine status bases on EXP Date*/}
      </View>

      {/* Needs a drop Down */}
      {/* Dropdown needs to Display DATA */}
    </View>
  );
}
const styles = StyleSheet.create(
  {
    containerBox: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10,
      marginHorizontal: 20,
      marginBottom: 20,
      padding: 10,
      paddingVertical: 15,
      borderWidth: 3,
      borderColor: "purple", //This wil be changed with EXP DATE. (if Status BLA, change style to BLA)
    },
  },
  {
    nameContainer: {
      padding: 5,
      borderWidth: 3,
    },
  },
  { statusContainer: {} }
  // {
  //     {

  //     }
  // }
);

/* have a div
in the div Tetx of Item name, Status (Requires Function with DATES and SYS DATE), Drop down onclick

Make text color style sheet based on status: Good, Soon, Expired

*/

/*
const styles = StyleSheet.create({

<View style={{flexdirection: column}}>Hello</View>

})*/
