import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { format, parseISO, subDays } from "date-fns";

export default function ItemInfoComponent({ sysDate, item, pressHandler }) {
  //placeholder to demonstrate Style sheet
  let statusValue = 0; //0:Good, 1: Soon 2: Bad

  // Expiration Date Checker ******************************
  let systemDate = sysDate;

  let expDate = format(new Date(), item.expiration_date, "yyyy-MM-dd");

  let temp = subDays(parseISO(item.expiration_date), 7);

  parseISO(systemDate) < temp
    ? (statusValue = 0)
    : parseISO(systemDate) > temp && parseISO(systemDate) <= parseISO(expDate)
    ? (statusValue = 1)
    : (statusValue = 2);
  // ******************************************************

  //Status Handler Function
  return (
    <TouchableOpacity
      onLongPress={() => pressHandler(item.item_id)}
      onPress={() => {
        //console.log(item);
        console.log(item.item_name + " Pressed!");
      }}
    >
      {statusValue === 2 ? (
        <Text style={[styles.item, Status.expired]}>
          {item.item_name + " "}
          {item.expiration_date}
        </Text>
      ) : statusValue === 0 ? (
        <Text style={[styles.item, Status.good]}>
          {item.item_name + " "}
          {item.expiration_date}
        </Text>
      ) : (
        <Text style={[styles.item, Status.soon]}>
          {item.item_name + " "}
          {item.expiration_date}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginTop: 10,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    backgroundColor: "gray",
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
