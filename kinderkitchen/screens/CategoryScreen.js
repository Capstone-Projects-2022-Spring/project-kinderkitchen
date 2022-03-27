import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";
import TodoItem from "../Components/CategoryItem";
import AddCategory from "../Components/AddCategory";

import { getDatabase, onValue, set, get, ref, child, push, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CategoryItem from "../Components/CategoryItem";
import { TouchableOpacity } from "react-native-gesture-handler";


const CategoryScreen = () => {



  //May neeed Asynch calls as page renders twice to wait for data collection

  const database = getDatabase();
  const bdRef = ref(database); //refrences Root database

  const auth = getAuth();
  const [currentUserID, setCurrentUserID] = useState(auth.currentUser.uid);

  const [categoryData, setCategoryData] = useState(ReadCategory);
  /*
  { 
    Fridge: true,   //True  ->  Category Has Items
    Pantry: false,  //False ->  Category does not have items
    Other: false
  }
  */

  const [placeHolderData, setPlaceHolderData] = useState([{
    Fridge: false,   //True  ->  Category Has Items
    Pantry: false,  //False ->  Category does not have items
    Other: false
  }]);


  const [dbData, setDBData] = useState([]);





  // //const categoryRef = ref(database, 'categories/' + categoryID + '/categoryName');

  // /*Get Currently SignedIn User - Observer*/
  // onAuthStateChanged(auth, (user) => {
  //   if (user) { //User is Signed In
  //     setCurrentUserID(user.uid);
  //     // ...
  //   } else {
  //     alert('User is Signed out');
  //   }
  // });


  // setCategoryData((prevData) => {
  //   return [{ categoryName: childData, key: childKey }, ...prevData];
  // });



  // onValue(ref(database, 'users/' + currentUserID + '/categories'), (snapshot) => {
  //   setDBData(snapshot.val());
  // }, {
  //   onlyOnce: true
  // });

  // console.log(dbData);

  function ReadCategory() {
    get(child(ref(database), `users/${currentUserID}/categories`)).then((snapshot) => {
      if (snapshot.exists()) {
        setCategoryData(snapshot.val())
      } else {
        console.log("No data available");
        setCategoryData({ UnknownCategory: false });
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  function addCategory(categoryName, userID) {
    if (categoryName === "") { alert("Category Name Cannot Be Blank"); return; } //Future Bug - Spaces and extra white space
    if (categoryName in categoryData) { alert("Category Already Exists!"); return; }//Future BUG - Case sensitivity, Set to lower/to upper on creation. then do a to upper/tolower comapre
    let localData = categoryData;
    localData[categoryName] = false;
    setCategoryData(localData);
    const updates = {};
    updates['users/' + userID + '/categories/'] = categoryData;
    return update(ref(database), updates);
  }


  {
    /*   This is a function that does the deleting from the list by long pressing on the item */
  }
  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };


  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <ScrollView style={styles.scrollView}>

          {/*   Display Categories   */}
          {/* On Page Render Data gathers twice. First Is Undefined second is Data */}
          {/* {placeHolderData.map((key)=>{console.log(key)}) */
          // forEach(key => { //Key is CategoryName - Untested as undefined triggers first
          // console.log(key);
          //   // <View key={key}>
          //   //   <CategoryItem categoryName={item} pressHandler={pressHandler} />
          //   // </View>
          // })
        }
        </ScrollView>

        {/*   Add Category Field   */}
        <AddCategory submitHandler={addCategory} userID={currentUserID} />
      </View>
      <MyNavMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#E8EAED",
    flex: 1,
    justifyContent: "center",
  },
  scrollView: {
    borderWidth: 1,
    width: "100%",
    marginBottom: 20,
  },
});

export default CategoryScreen;
