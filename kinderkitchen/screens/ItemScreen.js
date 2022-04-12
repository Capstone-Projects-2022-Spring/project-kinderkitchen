import React, { useState } from "react";
import {
  View,
  Modal,
  ScrollView,
  Text,
  Alert,
  Pressable,
  TextInput,
  StyleSheet,
  Button,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { format, getHours, parseISO } from "date-fns";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import MyNavMenu from "../nav-bar/MyNavMenu";
import ItemInfoComponent from "../Components/ItemInfoComponent";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  get,
  set,
  ref,
  child,
  push,
  update,
  remove,
} from "firebase/database";

import HeaderComponent from "../Components/HeaderComponent";
import EditItemModal from "../Components/EditItemModal";

const ItemScreen = ({ props, route, navigation }) => {
  function consoleLogTesting() {
    /*Route Log Test*/
    console.log("=========== Page Update ===========");
    console.log("\nRoute INFO: ");
    console.log(route);
    console.log("\nRoute PARAMS: ");
    console.log(route.params);
    /*Category log Test*/
    console.log("\nthisCategoryName: ");
    console.log(thisCategoryName);
    console.log("\ncategoryData: /n\n");
    console.log(categoryData);
  }

  const thisCategoryName = route.params.categoryName;
  const categoryData = route.params.passingCategoryData; //If issues with null category, Read Data from DB
  //Make Database call for Categories instead of passing?
  const database = getDatabase();
  const DBref = ref(database);
  const auth = getAuth();
  const [currentUserID, setCurrentUserID] = useState(auth.currentUser.uid);

  const [modalVisible, setModalVisible] = useState(false);
  const [editItemModalVisable, setEditItemModalVisable] = useState(false);

  //FUTURE PLANING:
  //ITEM EDITING Prompt and Alert - We could vote to remove this feature. make user delete then re add.
  //Item Editing w/ DB
  //      -> Make Sure on Category Change -> it changes to new Category

  //Item Deleting:
  //      -> Check If Last Item Deleted
  //            -> check if category name is in users items category
  //             => Alternate, Create a counter for each Item added, not True/False?

  //ONPRESS Events for Item Component (DELETE, EDIT,)

  const [itemData, setItemData] = useState(readItemData());
  const [itemToEdit, setItemToEdit] = useState({
    categoryName: "",
    itemName: "Milk",
    expirationDate: "2022-03-06",
  });

  //Example Obj
  const [itemObject, setItemObject] = useState([
    {
      categoryName: "Fridge",
      itemName: "Milk",
      expirationDate: "2022-03-06",
    },
    {
      categoryName: "Pantry",
      itemName: "LuckyCharns",
      expirationDate: "2022-03-06",
    },
    {
      categoryName: "Fridge",
      itemName: "Eggs",
      expirationDate: "2022-03-06",
    },
    {
      categoryName: "Pantry",
      itemName: "Gold Fish",
      expirationDate: "2022-03-06",
    },
  ]);

  // Sort by expiration date, soonest first ********************
  // itemData.sort((a, b) => {
  //   return parseISO(a.expirationDate) - parseISO(b.expirationDate);
  // });
  // // ***********************************************************

  /* Drop Down */
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(thisCategoryName);
  const [items, setItems] = useState(setDropdownItems()); //[{ label: "Fridge", value: "Fridge" }, { label: "Pantry", value: "Fridge" },

  function setDropdownItems() {
    let obj = [];
    for (var key in categoryData) {
      if (categoryData[key] != null) {
        obj.push({ label: key, value: key });
      }
    }
    return obj;
  }

  /*Textbox Fields*/
  const [itemName, setItemName] = useState("");                     //Used for AddingItems, and current ItemSelected
  const [expirationDate, setExpirationDate] = useState("");         //Used for AddingItems, and current ItemSelected
  const [oldItemName, setOldItemName] = useState("");               //Used for EditItem


  /* DB Functions */
  function readItemData() {
    get(
      child(ref(database), `users/${currentUserID}/items/${thisCategoryName}/`)
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          setItemData(snapshot.val());
        } else {
          console.log("No data available");
          // ....
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function deleteItem(itemName) {
    alert(
      "Secondary Confirmation Coming soon!\n Proceeding with deletion of " +
        itemName
    );

    remove(
      ref(
        database,
        `users/${currentUserID}/items/${thisCategoryName}/${itemName}`
      )
    );

    let localData = itemData;
    delete localData[itemName];
    setItemData(localData);
    if (Object.keys(itemData).length < 1) {
      //NEW
      categoryData[thisCategoryName] = false;
      const updates = {};
      updates["users/" + currentUserID + "/categories/"] = categoryData;
      alert(
        "Last Item Deleted : \n Bug with not removing Last Entry On-screen"
      );
      return update(ref(database), updates);
    }
  }

  //This Function will be called when the Item is pressed
  function beginItemEdit(item) {
    setItemToEdit(item);
    setOldItemName(item.itemName);
    setEditItemModalVisable(true);
  }

  //This Function will process when the submitEdit button is pressed
  function editItem(thisItemData, oldItemName) {
    remove(
      ref(
        database,
        `users/${currentUserID}/items/${thisCategoryName}/${oldItemName}`
      )
    );
    addItem(thisItemData);
  }

  function displayItemData() {
    let items = [];
    for (var key in itemData) {
      items.push(
        <View key={key}>
          <ItemInfoComponent
            sysDate={format(new Date(), "yyyy-MM-dd")}
            item={itemData[key]}
            deleteItemFunction={deleteItem}
            editItemFunction={beginItemEdit} //Will show the modal
          />
        </View>
      );
    }
    return items;
  }

  /* Database Adding Of Item */
  const addItem = (newItemObj) => {
    let localData = categoryData;
    if (localData[newItemObj.categoryName] === null) {
      alert("UnExpected null value\n Did you Delete this Category?");
      return;
    }
    localData[newItemObj.categoryName] = true;
    const updates = {};
    updates[
      "users/" +
        auth.currentUser.uid +
        "/items/" +
        newItemObj.categoryName +
        "/" +
        newItemObj.itemName
    ] = newItemObj;
    updates["users/" + auth.currentUser.uid + "/categories/"] = localData; //Bug Fix
    return update(ref(database), updates);
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {
          thisCategoryName ? (
            <HeaderComponent title={thisCategoryName} />
          ) : (
            <HeaderComponent title="CATEGORY_NAME" />
          ) /*If no title provided*/
        }
        <ScrollView style={styles.scrollView}>
          {displayItemData()}

          {/*Add Item Form Pop-Up*/}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <MaterialIcons
                  name="close"
                  size={24}
                  style={{ ...styles.modalToggle, ...styles.modalClose }}
                  onPress={() => setModalVisible(false)}
                />

                {/*Header*/}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalText}>Add Item</Text>
                </View>

                {/*Item Name*/}
                <View style={styles.inputView}>
                  <View style={styles.inputTitle}>
                    <Text>Item Name:</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={(newText) => setItemName(newText)}
                    /*Make CharacterLimit*/
                  />
                </View>

                {/*Expiration Date*/}
                <View style={styles.inputView}>
                  <View style={styles.inputTitle}>
                    <Text>Expiration Date:</Text>
                  </View>

                  {/* ExpirationDate */}
                  <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    onChangeText={(newText) => setExpirationDate(newText)}
                  />
                </View>

                {/*Category:*/}
                <View style={styles.inputView}>
                  <View style={styles.inputTitle}>
                    <Text>Category:</Text>
                  </View>
                  <DropDownPicker
                    style={{ width: "40%" }}
                    dropDownContainerStyle={{ width: "40%" }}
                    placeholder={thisCategoryName}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                  />
                </View>

                {/*ButtonField*/}
                <View style={styles.submissionField}>
                  {/*Submit Button*/}
                  <Pressable
                    style={[styles.button, styles.buttonSubmit]}
                    onPress={() => {
                      addItem({
                        itemName: itemName,
                        expirationDate: expirationDate,
                        categoryName: value,
                      });
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Submit</Text>
                  </Pressable>

                  {/*Scan Button*/}
                  <Pressable
                    style={[
                      styles.button,
                      styles.buttonScan,
                      { marginLeft: 60, paddingHorizontal: 20 },
                    ]}
                    onPress={() => navigation.navigate("Barcode")}
                  >
                    <MaterialCommunityIcons
                      name="barcode-scan"
                      size={24}
                      color="black"
                    />
                    <Text style={styles.textStyle}></Text>
                  </Pressable>
                </View>
                {/*END - ButtonField*/}
              </View>
            </View>
          </Modal>

          {/******************
             EDIT ITEM MODAL 
          ********************/}

          <Modal
            animationType="slide"
            transparent={true}
            visible={editItemModalVisable}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setEditItemModalVisable(!editItemModalVisable);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <MaterialIcons
                  name="close"
                  size={24}
                  style={{ ...styles.modalToggle, ...styles.modalClose }}
                  onPress={() => setEditItemModalVisable(false)}
                />

                {/*Header*/}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalText}>Edit Item</Text>
                </View>

                {/*Item Name*/}
                <View style={styles.inputView}>
                  <View style={styles.inputTitle}>
                    <Text>Item Name:</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={(newText) => itemToEdit.itemName = newText}
                    // onEndEditing={(newText) => itemToEdit.itemName = newText}
                    placeholder={itemToEdit.itemName}
                    defaultValue={itemToEdit.itemName}
                    maxLength={15}

                  />
                </View>

                {/*Expiration Date*/}
                <View style={styles.inputView}>
                  <View style={styles.inputTitle}>
                    <Text>Expiration Date:</Text>
                  </View>

                  <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    onChangeText={(newText) => itemToEdit.expirationDate = newText}
                    // onEndEditing={(newText) => itemToEdit.expirationDate = newText}
                    defaultValue={itemToEdit.expirationDate}
                    maxLength={10}
                    //Additional User Input Handling - user inputs only #, dashes are put in when user types
                  />
                </View>

                {/*Category:*/}
                <View style={styles.inputView}>
                  <View style={styles.inputTitle}>
                    <Text>Category:</Text>
                  </View>
                  <DropDownPicker
                    style={{ width: "40%" }}
                    dropDownContainerStyle={{ width: "40%" }}
                    placeholder={thisCategoryName}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                  />
                </View>

                {/*ButtonField*/}
                <View style={styles.submissionField}>
                  {/*Submit Button*/}
                  <Pressable
                    style={[styles.button, styles.buttonSubmit]}
                    onPress={() => {
                      let oldItemName = itemToEdit.itemName;
                      setEditItemModalVisable(!editItemModalVisable);
                      itemToEdit.categoryName = value;
                      editItem(itemToEdit, oldItemName);
                      setValue(thisCategoryName); //reset Default Value
                    }}
                  >
                    <Text style={styles.textStyle}>Submit</Text>
                  </Pressable>
                </View>
                {/*END - ButtonField*/}
              </View>
            </View>
          </Modal>

          {/* I tried to make it its own modal but hit a wall */}

          {/* <EditItemModal 
            thisItemData={itemData}
            categoryData={categoryData}
            submitEditItem={editItem}
            showModalFunction
            /> */}
        </ScrollView>

        <Pressable
          style={styles.button}
          onPress={() => {
            setModalVisible(true);
            console.log("Button Press");
          }}
        >
          <Text style={{ textAlign: "center" }}>+ Add Item</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingBottom: 10,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#E8EAED",
    flex: 1,
    justifyContent: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  //The Pop-Up Box
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  //The Top Section to have a Line
  modalHeader: {
    width: "100%",
    padding: 35,
    paddingTop: 10,
    paddingBottom: 0,
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },

  //Will consist of each field entry.
  inputView: {
    width: "100%",
    flexDirection: "row",
    //alignItems: "stretch",
    padding: 5,
    paddingHorizontal: 10,
  },

  //Allows for a cleaner view
  inputTitle: {
    width: "50%",
    marginRight: 20,
  },

  input: {
    width: "40%",
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 1,
  },

  //Bottom Section to Hold Buttons
  submissionField: {
    width: "100%",
    flexDirection: "row",
    borderTopColor: "gray",
    borderTopWidth: 1,
    marginTop: 20,
  },

  button: {
    borderRadius: 30,
    padding: 10,
    elevation: 2,
    backgroundColor: "skyblue",
    marginTop: 10,
    //margin: 20
  },
  buttonSubmit: {
    width: "30%",
    marginTop: 10,
    marginHorizontal: 27,
    backgroundColor: "gray",
    marginVertical: 15,
  },
  buttonScan: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: "gray",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",

    //top: 30,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  scrollView: {
    borderWidth: 1,
    width: "98%",
    marginVertical: 5,
    marginBottom: 20,
    padding: 10,
  },
  modalToggle: {
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 8,
    top: 7,
    right: 120,
    borderRadius: 10,
    //alignSelf: 'center',
  },
  modalClose: {
    marginTop: 10,
    marginBottom: 0,
  },
});

export default ItemScreen;
