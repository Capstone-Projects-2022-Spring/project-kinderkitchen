import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

import { parseISO, subDays } from "date-fns";

export default function ItemInfoComponent({
  sysDate,
  item,
  deleteItemFunction,
  editItemFunction,
}) {
  //placeholder to demonstrate Style sheet
  let statusValue = 0; //0:Good, 1: Soon 2: Bad

  // Expiration Date Checker ***********************************
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

  //Status Handler Function
  return (
    <TouchableOpacity
      onLongPress={() => deleteItemFunction(item.itemName)}
      onPress={() => editItemFunction(item)}
    >
      {statusValue === 2 ? (
        <View style={[styles.itemContainer, Status.expired]}>
          <Image
            // Change this to an image that is saved to
            // database that corresponds to each item
            source={require("../assets/favicon.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.item}>{item.itemName}</Text>
          <Text style={styles.expDate}>{item.expirationDate}</Text>
        </View>
      ) : statusValue === 0 ? (
        <View style={[styles.itemContainer, Status.good]}>
          <Image
            // Change this to an image that is saved to
            // database that corresponds to each item
            source={require("../assets/favicon.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.item}>{item.itemName}</Text>
          <Text style={styles.expDate}>{item.expirationDate}</Text>
        </View>
      ) : (
        <View style={[styles.itemContainer, Status.soon]}>
          <Image
            // Change this to an image that is saved to
            // database that corresponds to each item
            source={require("../assets/favicon.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.item}>{item.itemName}</Text>
          <Text style={styles.expDate}>{item.expirationDate}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "gray",
    margin: 5,
  },

  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    padding: 10,
  },

  item: {
    flex: 6,
    alignSelf: "center",
    padding: 10,
  },

  expDate: {
    flex: 3,
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
