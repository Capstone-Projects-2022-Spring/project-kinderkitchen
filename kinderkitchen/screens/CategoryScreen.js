import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Pressable, TextInput } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";
import AddCategory from "../Components/AddCategory";

import { getDatabase, onValue, set, get, ref, child, push, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CategoryItem from "../Components/CategoryItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Modal } from "react-native-paper";


const CategoryScreen = () => {



  //May neeed Asynch calls as page renders twice to wait for data collection

  const database = getDatabase();
  const bdRef = ref(database); //refrences Root database

  const auth = getAuth();
  const [currentUserID, setCurrentUserID] = useState(auth.currentUser.uid);

  const [categoryData, setCategoryData] = useState(ReadCategory); //similar to placeHolderData

  const [placeHolderData, setPlaceHolderData] = useState({
    Fridge: false,   //True  ->  Category Has Items
    Pantry: false,  //False ->  Category does not have items
    Other: false
  });


  const [dbData, setDBData] = useState([]);

    /*  These are for the edit name func */
  const [isModalVisible, setisModalVisible] = useState(false);
  const [inputText, setinputText] = useState();



    const onPressSaveEdit = () => {


    }







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

  function displayData() {
    let items = [];
    for (var key in categoryData) {
      items.push(
        <View key={key}>
          <CategoryItem categoryName={key} deleteCategoryFunction={deleteCategory} />
        </View>);
    }
    return items;
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

  function deleteCategory(categoryName) {//category name is the Key, Check if False, if False Delete is good
    
    alert("Secondary Confirmation Coming soon!\n Proceeding with Deletion");
    let hasItems = categoryData[categoryName];
    if (hasItems){alert("Cannot Delete, Category has Items! \nOverride comming soon!"); return;}
    let localData = categoryData;
    localData[categoryName] = null;
    /* Once Items Have DB Ref. Remove Category From Items DB Table */
    setCategoryData(localData);
    const updates = {};
    updates['users/' + auth.currentUser.uid + '/categories/'] = categoryData;
    alert("Deletion Success!\nKnown Bug: Page does not update.\n\nLog out and back in to see change.")
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
          {displayData()}

                  {/*   Display Editing Cateogry Modal   */}

                  <Modal
                      animationType='fade'
                      visible={isModalVisible}
                      onRequestClose={() => setisModalVisible(false)}
                  >
                      <View style={styles.modalView}>
                          <Text style={styles.text}> Change Text:  </Text>
                          <TextInput
                              style={styles.textInput}
                              onChangeText={(text) => setinputText(text)}
                              defaultValue={inputText}
                              editable={true}
                              multiline={false}
                              maxLength={200}
                          />

                          <TouchableOpacity
                              onLongPress={() => onPressSaveEdit()}
                              style={styles.touchableSave}
                          >
                              <Text style={styles.text}> Save </Text>

                              </TouchableOpacity>
                      </View>

                  </Modal>

        
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
    textInput: {
        width: '90%',
        height: 70,
        borderColor: 'grey',
        borderWidth: 1,
        fontSize: 25
    },
    modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    touchableSave: {
        backgroundColor: 'orange',
        paddingHorizontal: 100,
        alignItems: 'center',
        marginTop: 20,
    }
    
});

export default CategoryScreen;
