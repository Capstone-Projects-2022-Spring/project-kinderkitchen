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
  const [todos, setTodos] = useState([
    { text: "Pantry", key: "1" },
    { text: "Fridge", key: "2" },
    { text: "Fruit", key: "3" },
  ]);




  const database = getDatabase();
  const auth = getAuth();

  const [dbData, setDBData] = useState([]);


  const [currentUserID, setCurrentUserID] = useState();

  const [categoryData, setCategoryData] = useState([]);
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


  function addCategory(categoryName, userID) {
    const newCategoryKey = push(child(ref(database), 'categories')).key;
    const updates = {};
    updates['users/' + userID + '/categories/' + newCategoryKey] = { categoryName: categoryName };
    return update(ref(database), updates);
  }

  function ParseDBData() {
    for (var key in dbData) {
      setCategoryData((prevData) => {
        return [{ categoryName: dbData[key].categoryName, categoryKey: key }, ...prevData];
      });
    }
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
        {/*   this list thru array and display   */}
        <ScrollView style={styles.scrollView}>
          {//categoryData.map((categoryName, key) => (
            categoryData.map((item, key) => (
              <View key={key}>
                <CategoryItem item={item} pressHandler={pressHandler} />
              </View>
            ))}
        </ScrollView>

        {/*   Add Category Field   */}
        <AddCategory submitHandler={addCategory} userID={currentUserID} />
        <TouchableOpacity onPress={ParseDBData}><Text>Press</Text></TouchableOpacity>
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
