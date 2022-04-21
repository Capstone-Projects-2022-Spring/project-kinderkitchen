import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { CheckBox } from "react-native-elements";

import { parseISO, subDays } from "date-fns";

export default function ItemSelect({ sysDate, item, addItemToList }) {
  let statusValue = 0; //0:Good, 1: Soon 2: Bad

  let systemDate = parseISO(sysDate);
  let expDate = parseISO(item.expirationDate);

  let temp = subDays(expDate, 7);

  /** Items with no expiration date set will be auto colored red
   * If you want a different color (yellow or green), move the
   * conditions around.
   */
  systemDate <= temp
    ? (statusValue = 0)
    : systemDate > temp && systemDate <= expDate
    ? (statusValue = 1)
    : (statusValue = 2);
  // ***********************************************************

  // set state of checkbox to true/false
  const [selectItem, setSelectItem] = useState(false);

  //Status Handler Function
  return (
    <View>
      {statusValue === 2 ? (
        <View style={[styles.itemContainer, Status.expired]}>
          <CheckBox
            uncheckedColor="black"
            checkedColor="black"
            checked={selectItem}
            onPress={() => {
              setSelectItem(!selectItem);
              addItemToList(!selectItem, item.itemName, item.categoryName);
              if (!selectItem) {
                alert("WARNING!\nYou have selected an expired item.");
              }
            }}
          />
          <Image
            // Change this to an image that is saved to
            // database that corresponds to each item
            source={require("../assets/favicon.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.item}>{item.itemName + " "}</Text>
          <Text style={styles.expDate}>{item.expirationDate}</Text>
        </View>
      ) : statusValue === 0 ? (
        <View style={[styles.itemContainer, Status.good]}>
          <CheckBox
            uncheckedColor="black"
            checkedColor="black"
            checked={selectItem}
            onPress={() => {
              setSelectItem(!selectItem);
              addItemToList(!selectItem, item.itemName, item.categoryName);
            }}
          />
          <Image
            // Change this to an image that is saved to
            // database that corresponds to each item
            source={require("../assets/favicon.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.item}>{item.itemName + " "}</Text>
          <Text style={styles.expDate}>{item.expirationDate}</Text>
        </View>
      ) : (
        <View style={[styles.itemContainer, Status.soon]}>
          <CheckBox
            uncheckedColor="black"
            checkedColor="black"
            checked={selectItem}
            onPress={() => {
              setSelectItem(!selectItem);
              addItemToList(!selectItem, item.itemName, item.categoryName);
            }}
          />
          <Image
            // Change this to an image that is saved to
            // database that corresponds to each item
            source={require("../assets/favicon.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.item}>{item.itemName + " "}</Text>
          <Text style={styles.expDate}>{item.expirationDate}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "gray",
    margin: 5,
  },

  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    padding: 15,
  },

  item: {
    flex: 4.5,
    alignSelf: "center",
    padding: 10,
  },

  expDate: {
    flex: 3.5,
    alignSelf: "center",
    textAlign: "right",
    padding: 10,
  },
});

const Status = StyleSheet.create({
  good: {
    borderColor: "green",
    backgroundColor: "limegreen",
    color: "black",
  },
  expired: {
    borderColor: "#ff0000",
    backgroundColor: "#ffc9c9",
    color: "black",
  },
  soon: {
    borderColor: "#ffe100",
    backgroundColor: "#fdffad",
    color: "black",
  },
});
