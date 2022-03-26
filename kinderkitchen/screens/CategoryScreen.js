import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";
import TodoItem from "../Components/TodoItem";
import AddTodo from "../Components/addTodo";

import { getDatabase, onValue, set, ref, child, push, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const CategoryScreen = () => {
  const [todos, setTodos] = useState([
    { text: "Pantry", key: "1" },
    { text: "Fridge", key: "2" },
    { text: "Fruit", key: "3" },
  ]);




  const database = getDatabase();
  const auth = getAuth();

  // const [databaseRef, setDBRef] = useState();
  const [currentUserID, setCurrentUserID] = useState();

  // const [categoryData, setCategoryData] = useState([]);
  // //const categoryRef = ref(database, 'categories/' + categoryID + '/categoryName');

  /*Get Currently SignedIn User - Observer*/
  onAuthStateChanged(auth, (user) => {
    if (user) { //User is Signed In
      setCurrentUserID(user.uid);
      // setDBRef(ref(database, 'users/' + user.uid + '/categories'))
      // onValue(databaseRef, (snapshot) => {
      //   snapshot.forEach((childSnapshot) => {
      //     const childKey = childSnapshot.key; //Giberish
      //     const childData = childSnapshot.val(); //{categoryName: 'string'}
      //     setCategoryData((prevData) => {
      //       return [{categoryName: Pizza, key: childKey}, ...prevData];
      //     });
      //     // // ...
      //   });
      // }, {
      //   onlyOnce: true
      // });
      // ...
    } else {
      alert('User is Signed out');
    }
  });





  function addCategory(categoryName, userID) {
    const newCategoryKey = push(child(ref(database), 'categories')).key;
    const updates = {};
    updates['users/' + userID + '/categories/' + newCategoryKey] = { categoryName: categoryName };
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
        {/*   this list thru array and display   */}
        <ScrollView style={styles.scrollView}>
          {//categoryData.map((categoryName, key) => (
            todos.map((item, key) => (
              <View key={key}>
                <TodoItem item={item} pressHandler={pressHandler} />
              </View>
            ))}
        </ScrollView>

        {/*   Content   */}
        <AddTodo submitHandler={addCategory} userID={currentUserID} />
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
