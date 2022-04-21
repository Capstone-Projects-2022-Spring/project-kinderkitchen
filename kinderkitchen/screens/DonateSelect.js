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
import { getDatabase, get, ref, child, remove, update } from "firebase/database";

const DonateSelect = ({navigation}) => {
  useEffect(() => {
    readDBItems();
    getAllCat();
    getDonateAchieveData();
  }, []);

  const DB = getDatabase();
  const [currentUserID, setCurrentUserID] = useState(getAuth().currentUser.uid);

  const [DBItems, setDBItems] = useState();
  const [allCat, setAllCat] = useState({});



  const [achievementData, setAchievementData] = useState({});
  const [numItemsDonated, setNumItemsDonated] = useState();
  const [numDonationCompleted, setNumDonationCompleted] = useState();
  //Add Any Other Donation Achieve Constants Here 

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

  function getAllCat() {
    get(
      child(ref(DB), `users/${currentUserID}/categories/`)
    ).then((snapshot) => {
      if (snapshot.exists()) {
        setAllCat(snapshot.val());
        console.log("CAT");
      } else {
        console.log("No data available");
        // Should Not Get Here
      }
    })
      .catch((error) => {
        console.error(error);
      });
  }

  function getDonateAchieveData() {
    let x;
    get(
      child(ref(DB), `users/${currentUserID}/achievementData`)
    ).then((snapshot) => {
      if (snapshot.exists()) {
        setAchievementData(snapshot.val());
      } else {
        //No Achievments Ever Set
        setAchievementData({"donationsCompleted":0, "itemsDonated": 0});
        setNumItemsDonated(0);
        setNumDonationCompleted(0);
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
        items.push(
          <View key={itemKey}>
            <ItemSelect
              sysDate={format(new Date(), "yyyy-MM-dd")}
              item={CatObj[Item]}
              addItemToList={addItemToList}
            />
          </View>
        );
        itemKey++;
      }
    }
    return items;
  }

  function donationConfirm(donateArray) {
    const arrayObj = Object.create(donateArray);
    if (arrayObj.length < 1) {
      alert("No Items Selected!");
      return;
    }

    var itemDonateCount = 0;
    var donationsCompleted = 0;

    if ("donationsCompleted" in achievementData) {
      donationsCompleted = achievementData["donationsCompleted"];
    }

    if ("itemsDonated" in achievementData) {
      itemDonateCount = achievementData["itemsDonated"];
    }

    let achievementTemp = achievementData;

    let itemObj = {}; //stores a temp object with itemName and CategoryName
    let tempDBItems = DBItems;
    let categoryDBItem = {}; //will hold the all items from specific categoryfrom DB items
    let tempAllCat = allCat;
    const updates = {};

    //Remove All Donated Items
    for (var obj in arrayObj) {
      itemObj = arrayObj[obj]
      categoryDBItem = tempDBItems[itemObj["categoryName"]];
      // remove from DB
      remove(
        ref(
          DB,
          `users/${currentUserID}/items/${itemObj["categoryName"]}/${itemObj["itemName"]}`
        )
      );
      itemDonateCount++;
      console.log(itemDonateCount);

      //Remove Locally (Used for Category Emptying)
      delete categoryDBItem[itemObj["itemName"]];
      tempDBItems[itemObj["categoryName"]];

      //Check if Items are still In Category
      if (Object.keys(categoryDBItem).length === 0) {
        tempAllCat[itemObj["categoryName"]] = false;
        updates["users/" + currentUserID + "/categories/"] = tempAllCat;
      }
      // console.log(categoryDBItem[itemObj["itemName"]]);
      // console.log(tempDBItems[itemObj["categoryName"]]);
      // console.log(tempDBItems);
    }
    donationsCompleted++;
    //Achievement For Donation # HERE
    achievementTemp["donationsCompleted"] = donationsCompleted;

    //Achievement For Item # HERE
    achievementTemp["itemsDonated"] = itemDonateCount;

    //Additional Achievements Here

    console.log(achievementTemp);
    updates["users/" + currentUserID + "/achievementData/"] = achievementTemp;

    return update(ref(DB), updates);
  }



  //////I did workaround with object handling////////////
  //Asynch call? there is a time conflict Bug here
  //   let temp = allCat;
  //   for (var key in allCat) {
  //     get(
  //       child(ref(DB), `users/${currentUserID}/items/${key}`)
  //     ).then((snapshot) => {
  //       if (snapshot.exists()) {
  //         // DO Nothing
  //       } else {
  //         temp[key] = false;
  //         setAllCat(temp);
  //       }
  //     })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }


  // Add items to array when checked; remove when unchecked ****
  const _ = require("lodash");
  const itemList = [];
  const addItemToList = (selectItem, itemName, categoryName) => {
    if (selectItem === true) {
      itemList.push({ "itemName": itemName, "categoryName": categoryName });
    } else {
      //I found difficulty in doing this - this was the only thing i could come up with
      let innerObj = {};
      var i = 0;
      for (var obj in itemList) {
        innerObj = itemList[obj];
        if (innerObj["itemName"] === itemName && innerObj["categoryName"] === categoryName) {
          _.pull(itemList, itemList[i]);
          break;
        }
        i++;
      }
    }
  };
  // ***********************************************************

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.textBox}>
          <Text style={{ fontSize: 20 }} adjustsFontSizeToFit>
            Select items to Donate
          </Text>
        </View>

        <ScrollView style={styles.scrollView}>{displayData()}</ScrollView>

        <TouchableOpacity
          style={styles.customBtn}
          onPress={() => {
            donationConfirm(itemList);
            console.log(itemList.length);
            if (itemList.length >= 1){
              navigation.navigate("Search Food Banks");
            }
          }}
        >
          <Text>Donate</Text>
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
