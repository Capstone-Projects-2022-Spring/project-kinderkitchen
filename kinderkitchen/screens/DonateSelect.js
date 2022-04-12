import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { format } from "date-fns";

import MyNavMenu from "../nav-bar/MyNavMenu";
import ItemSelect from "../Components/ItemSelect";
import { getAuth } from "firebase/auth";
import { getDatabase, get, ref, child } from "firebase/database";

const DonateSelect = () => {
  useEffect(() => {
    readDBItems();
  }, []);

  const DB = getDatabase();
  const [currentUserID, setCurrentUserID] = useState(getAuth().currentUser.uid);

  const [DBItems, setDBItems] = useState();

  function readDBItems() {
    get(child(ref(DB), `users/${currentUserID}/items/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDBItems(snapshot.val());
        } else {
          console.log("No data available");
          // ....
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // iterate through each category and display all items
  function displayData() {
    let items = [];
    let itemKey = 0;
    let CatObj;
    for (var cat in DBItems) {
      CatObj = DBItems[cat];
      for (var Item in CatObj) {
        console.log("Adding Item: " + Item + " with Key: " + itemKey);
        items.push(
          <View key={itemKey}>
            <ItemSelect
              sysDate={format(new Date(), "yyyy-MM-dd")}
              item={CatObj[Item]}
            />
          </View>
        );
        itemKey++;
      }
    }
    return items;
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.textBox}>
          <Text style={{ fontSize: 20 }} adjustsFontSizeToFit>
            Select items to add to Donation Queue
          </Text>
        </View>

        {/* TODO: [ ] 1. convert views to checkboxes (CheckBox for Android; Switch for iOS?)
                  [ ] 2. add item to a list/array if checked
                  [ ] 3. remove item from list/array if unchecked
                  [ ] 4. search buttom uses every item in list/array to add to donation queue */}
        <ScrollView style={styles.scrollView}>{displayData()}</ScrollView>

        <TouchableOpacity
          style={styles.customBtn}
          onPress={() => {
            alert(
              "This will eventually add to the donation queue the items that were selected.\n\n" +
                "Navigate to your Donation Queue to confirm donation."
            );
          }}
        >
          <Text>Add to Donation Queue</Text>
        </TouchableOpacity>
      </View>
      <MyNavMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: 5,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#E8EAED",
    flex: 1,
    justifyContent: "center",
  },

  textBox: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
  },

  scrollView: {
    borderWidth: 1,
    width: "100%",
  },

  customBtn: {
    backgroundColor: "darkturquoise",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    width: "50%",
    borderWidth: 0.5,
    borderRadius: 4,
  },
});

export default DonateSelect;