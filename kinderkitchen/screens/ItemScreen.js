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
import { getDatabase, set, ref, child, push, update } from "firebase/database";

import HeaderComponent from "../Components/HeaderComponent";

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

  const [modalVisible, setModalVisible] = useState(false);

  //FUTURE PLANING:
  //ITEM EDITING Prompt and Alert - We could vote to remove this feature. make user delete then re add.
  //Item Editing w/ DB
  //      -> Make Sure on Category Change -> it changes to new Category

  //Item Deleting:
  //      -> Check If Last Item Deleted
  //            -> check if category name is in users items category
  //             => Alternate, Create a counter for each Item added, not True/False?

  //ONPRESS Events for Item Component (DELETE, EDIT,)

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

  // Sort by expiration date, soonest first ********************
  itemObject.sort((a, b) => {
    return parseISO(a.expiration_date) - parseISO(b.expiration_date);
  });
  // ***********************************************************

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
  const [itemName, setItemName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  /* For the date Picker func   */
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");
  const [date, setDate] = useState(new Date());

  /* For the date Picker func   */
  const onChange = (event, selectDate) => {
    const currentDate = selectDate || date;
    setShow(Platform.OS == "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let ftime =
      "Hours: " + tempDate / getHours() + "| Minutes: " + tempDate.getMinutes();
    setText(fDate + "\n" + ftime);

    console.log(fDate + "(" + ftime + ")");
  };

  /* For the date Picker func   */
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const pressHandler = (key) => {
    setItemObject((prevItemObject) => {
      return prevItemObject.filter((obj) => obj.item_id != key);
    });
  };

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
    updates[
      "users/" + auth.currentUser.uid + "/categories/" + newItemObj.categoryName
    ] = localData;
    return update(ref(database), updates);
  };

  const submitHandler = (props) => {
    setItemObject((prevItemObject) => {
      return [
        {
          item_id: Math.random().toString(),
          item_name: props.itemName,
          expiration_date: props.expirationDate,
          category_id: props.value,
          account_id: "1",
        },
        ...prevItemObject,
      ];
    });

//     // ***********************************************************

//     const [open, setOpen] = useState(false);
//     const [value, setValue] = useState(categoryID);
//     const [items, setItems] = useState([
//         { label: "Fridge", value: 1 },
//         { label: "Pantry", value: 2 },
//     ]);

    
//     /*Textbox Fields*/
//     const [itemName, setItemName] = useState("");
//     const [expirationDate, setExpirationDate] = useState("");

  

//     const pressHandler = (key) => {
//         setItemObject((prevItemObject) => {
//             return prevItemObject.filter((obj) => obj.item_id != key);
//         });
//     };

//     const submitHandler = (props) => {
//         setItemObject((prevItemObject) => {
//             //Change account_id
//             //get from routes to pass in all available categories
//             //console.log(props);
//             return [
//                 {
//                     item_id: Math.random().toString(),
//                     item_name: props.itemName,
//                     expiration_date: props.expirationDate,
//                     category_id: props.value,
//                     account_id: "1",
//                 },
//                 ...prevItemObject,
//             ];
//         });
//     };

//     const [status, setStatus] = useState(0); //STATUS STATES (0: Good , 1: Aproaching EXP, 2: Expired)

//     const [modalVisible, setModalVisible] = useState(false);

//     //props.category name
//     //props.category_id
//     //props.obj?
//     //props.item_name

//     return (
//         <View style={styles.container}>
//             <View style={styles.body}>
//                 {
//                     categoryName ? (
//                         <HeaderComponent title={categoryName} />
//                     ) : (
//                         <HeaderComponent title="CATEGORY_NAME" />
//                     ) /*If no title provided*/
//                 }
//                 <ScrollView style={styles.scrollView}>
//                     {itemObject.map((obj, key) => (
//                         <View key={key}>
//                             <ItemInfoComponent
//                                 sysDate={format(new Date(), "yyyy-MM-dd")}
//                                 item={obj}
//                                 pressHandler={pressHandler}
//                             />
//                         </View>
//                     ))}

//                     {/*Add Item Form Pop-Up*/}
//                     <Modal
//                         animationType='slide'
//                         transparent={true}
//                         visible={modalVisible}
//                         onRequestClose={() => {
//                             Alert.alert("Modal has been closed.");
//                             setModalVisible(!modalVisible);
//                         }}
//                     >
//                         <View style={styles.centeredView}>
//                             <View style={styles.modalView}>

//                                 <MaterialIcons
//                                     name='close'
//                                     size={24}
//                                     style={{ ...styles.modalToggle, ...styles.modalClose }}
//                                     onPress={() => setModalVisible(false)}
//                                 />

//                                 {/*Header*/}
//                                 <View style={styles.modalHeader}>
//                                     <Text style={styles.modalText}>Add Item</Text>
//                                 </View>
                            
//                                {/*Item Name*/}
//                                 <View style={styles.inputView}>
//                                     <View style={styles.inputTitle}>
//                                         <Text>Item Name:</Text>
//                                     </View>
//                                     <TextInput
//                                         style={styles.input}
//                                         onChangeText={(newText) => setItemName(newText)}
//                                     /*Make CharacterLimit*/
//                                     />
//                                 </View>

//                                 {/*Expiration Date*/}
//                                 <View style={styles.inputView}>
//                                     <View style={styles.inputTitle}>
//                                         <Text>Expiration Date:</Text>
//                                     </View>
                                                                 
//                                     <TextInput
//                                         style={styles.input}
//                                         placeholder="YYYY-MM-DD"
//                                         onChangeText={(newText) => setExpirationDate(newText)}
//                                     // defaultValue = "0001-01-28"
//                                     Make CharacterLimit
//                                     />
//                                 </View>

//                                 {/*Category:*/}
//                                 <View style={styles.inputView}>
//                                     <View style={styles.inputTitle}>
//                                         <Text>Category:</Text>
//                                     </View>
//                                     <DropDownPicker
//                                         style={{ width: "40%" }}
//                                         dropDownContainerStyle={{ width: "40%" }}
//                                         placeholder={categoryName}
//                                         open={open}
//                                         value={value}
//                                         items={items}
//                                         setOpen={setOpen}
//                                         setValue={setValue}
//                                         setItems={setItems}
//                                     />
//                                 </View> 

//                                 {/*ButtonField*/}
//                                 <View style={styles.submissionField}>
//                                     {/*Submit Button*/}
//                                     <Pressable
//                                         style={[styles.button, styles.buttonSubmit]}
//                                         onPress={() => {
//                                             submitHandler({ itemName, expirationDate, value });
//                                             setModalVisible(!modalVisible);
//                                         }}
//                                     >
//                                         <Text style={styles.textStyle}>Submit</Text>
//                                     </Pressable>

//                                     {/*Scan Button*/}
//                                     <Pressable
//                                         style={[
//                                             styles.button,
//                                             styles.buttonScan,
//                                             { marginLeft: 60, paddingHorizontal: 20 },
//                                         ]}
//                                         onPress={() => navigation.navigate("Barcode")}
//                                     >
//                                         <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
//                                         <Text style={styles.textStyle}></Text>
//                                     </Pressable>
//                                 </View>
//                                 {/*END - ButtonField*/}
//                             </View>
//                         </View>
//                     </Modal>
//                 </ScrollView>

//                 <Pressable
//                     style={styles.button}

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
          {itemObject.map((obj, key) => (
            <View key={key}>
              <ItemInfoComponent
                sysDate={format(new Date(), "yyyy-MM-dd")}
                item={obj}
                pressHandler={pressHandler}
              />
            </View>
          ))}

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

                  <Button
                    title="Date Picker"
                    onPress={() => showMode("date")}
                  />

                  {show && (
                    <DateTimePicker
                      testid="datetimepicker"
                      value={date}
                      mode={mode}
                      is24hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}

                  {/*<TextInput*/}
                  {/*    style={styles.input}*/}
                  {/*    placeholder="YYYY-MM-DD"*/}
                  {/*    //onChangeText={(newText) => setExpirationDate(newText)}*/}
                  {/*// defaultValue = "0001-01-28"*/}
                  {/*Make CharacterLimit*/}
                  {/*/>*/}
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
                      submitHandler({ itemName, expirationDate, value }); //Replace when Read is available
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
