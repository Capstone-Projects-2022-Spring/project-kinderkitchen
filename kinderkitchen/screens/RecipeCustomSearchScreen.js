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
import ItemInfoComponent from "../Components/ItemInfoComponent";
import { getAuth } from "firebase/auth";
import { getDatabase, get, set, ref, child, push, update, remove } from "firebase/database";

const RecipeCustomSearchScreen = () => {

  useEffect(() => {
    getAllItems();
    setAllItemsNoCategories();
  }, []);

  const [DBItems, setDBItems] = useState();
  const [allItems, setAllItems] = useState();
  const [currentUserID, setCurrentUserID] = useState(getAuth().currentUser.uid);
  const [DB, setDB] = useState(getDatabase());

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

  function setAllItemsNoCategories() {
    let items = [];
    var itemKey = 0;
    let CatObj;
    for (var cat in DBItems) {
      console.log("Inside Category: " + cat);
      CatObj = DBItems[cat];
      for (var Item in CatObj) {
        console.log("Adding Item: "+ Item);
        items[itemKey] = {
          itemName: CatObj[Item].itemName,
          expirationDate: CatObj[Item].expirationDate,
          categoryName: CatObj[Item].categoryName
        }
        itemKey++;
      }
    }
    setAllItems(items);
  }



  /*Dummy Data*/
  const [itemObject, setItemObject] = useState([
    {
      item_id: 1,
      item_name: "Milk",
      expiration_date: "2022-03-06",
      category_id: 1,
      account_id: 1,
    },
    {
      item_id: 2,
      item_name: "Lucky Charms",
      expiration_date: "2022-03-17",
      category_id: 2,
      account_id: 1,
    },
    {
      item_id: 3,
      item_name: "Eggs",
      expiration_date: "2022-04-20",
      category_id: 1,
      account_id: 1,
    },
    {
      item_id: 4,
      item_name: "Goldfish",
      expiration_date: "2022-03-28",
      category_id: 2,
      account_id: 1,
    },
  ]);

  function displayData(){
    let items = []
    for (var key in allItems){
      items.push(
      <View key={key}>
        <ItemSelect
          sysDate={format(new Date(), "yyyy-MM-dd")}
          item={allItems[key]}
          
        />
      </View>
      )
  }
  return items;
}

  const pressHandler = (key) => {
    setItemObject((prevItemObject) => {
      return prevItemObject.filter((obj) => obj.item_id != key);
    });
  };

  //let [itemArray, setItem] = useState([""]);

  // setItem((prevItemArray) => [...prevItemArray, item.item_name]);
  // console.log(itemArray);

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
        <ScrollView style={styles.scrollView}>
          
          {displayData}
        </ScrollView>

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
