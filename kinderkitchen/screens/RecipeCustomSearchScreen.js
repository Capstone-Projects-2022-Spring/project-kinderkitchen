import React, { useState } from "react";
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

const RecipeCustomSearchScreen = () => {
  const [currentUserID, setCurrentUserID] = useState(getAuth().currentUser.uid);
  const [DB, setDB] = useState(getDatabase());
  const [DBItems, setDBItems] = useState(getAllItems());

  // get items from database
  function getAllItems() {
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
    let CatObj;
    for (var cat in DBItems) {
      CatObj = DBItems[cat];
      for (var Item in CatObj) {
        items.push(
          <View key={Item}>
            <ItemSelect
              sysDate={format(new Date(), "yyyy-MM-dd")}
              item={CatObj[Item]}
            />
          </View>
        );
      }
    }
    return items;
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.textBox}>
          <Text style={{ fontSize: 20 }} adjustsFontSizeToFit>
            Select items to include in recipe search
          </Text>
        </View>

        {/* TODO: [ ] 1. convert views to checkboxes (CheckBox for Android; Switch for iOS?)
                  [ ] 2. add item to a list/array if checked
                  [ ] 3. remove item from list/array if unchecked
                  [ ] 4. search buttom uses every item in list/array to find a recipe */}
        <ScrollView style={styles.scrollView}>{displayData()}</ScrollView>

        <TouchableOpacity
          style={styles.customBtn}
          onPress={() => {
            alert(
              "This will eventually search for recipes based on which items were selected"
            );
          }}
        >
          <Text style={{ color: "#fff" }}>Search Recipes</Text>
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
    width: "30%",
    borderWidth: 0.5,
  },
});

export default RecipeCustomSearchScreen;
