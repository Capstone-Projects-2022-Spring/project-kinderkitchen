import React, { useState } from "react";
import { View, Modal, ScrollView, Text, Alert, Pressable, TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";


import MyNavMenu from "../nav-bar/MyNavMenu";
import ItemInfoComponent from "../Components/ItemInfoComponent";

import HeaderComponent from "../Components/HeaderComponent";

const ItemScreen = ({ route }) => {
  console.log("=========== Page Update ===========");
  console.log("\nRoute INFO: ");
  console.log(route);
  console.log("\nRoute PARAMS: ");
  console.log(route.params);
  const { categoryName, categoryID } = route.params;

  //Task For Later Note to self. on Route pass all Category Objects: Used for DropDown => or after DBCONN - Make Database call for Categories
  //Filter Items to display only items with correct category id => or DBCONN SQL query for items with only Category ID 
  
  
  //ONPRESS Events for Item Component (DELETE, EDIT,)
  //STATUS Based on SYSTEM date and EXP date, Order items by Status, have Style to havea visual
  //Style ITEMComponent


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
    }
  ]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(categoryID);
  const [items, setItems] = useState([
    { label: "Fridge", value: 1 },
    { label: "Pantry", value: 2 },
  ]);

  /*Textbox Fields*/
  const [itemName, setItemName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");



  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };


  const submitHandler = (props) => {
    setItemObject((prevItemObject) => {
      //Change account_id and category_id
      //get from routes to pass in all available categories
      console.log(props);
      return [{ 
        item_id: Math.random().toString(),
        item_name: props.itemName, 
        expiration_date: props.expirationDate,
        category_id: "1",
        account_id: "1",
        
      }, ...prevItemObject];
    });
  };

  const [status, setStatus] = useState(0); //STATUS STATES (0: Good , 1: Aproaching EXP, 2: Expired)





  const [modalVisible, setModalVisible] = useState(false);

  

  //props.category name
  //props.category_id
  //props.obj?
  //props.item_name

  return (

    <View style={styles.container}>
      <View style={styles.body}>
        {
          categoryName ? (
            <HeaderComponent title={categoryName} />
          ) : (
            <HeaderComponent title="CATEGORY_NAME" />
          ) /*If no title provided*/
        }
        <ScrollView style={styles.scrollView}>
          {itemObject.map((obj, key) => (
            <View key={key}>
              <ItemInfoComponent item={obj} pressHandler={pressHandler} />
            </View>
          ))}

          {/*Add Item Form Pop-Up*/}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
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
                  <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    onChangeText={(newText) => setExpirationDate(newText)}
                  // defaultValue = "0001-01-28"
                  /*Make CharacterLimit*/
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
                    placeholder={categoryName}
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
                      submitHandler({itemName, expirationDate});
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
                    onPress={() => console.log("ScanButtonPressed")}
                  >
                    <Text style={styles.textStyle}>Scan</Text>
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
      <MyNavMenu />
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
    backgroundColor: "#56ff9f",
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "skyblue",
    //marginTop: 10,
    //margin: 20
  },
  buttonSubmit: {
    width: "33%",
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: "#12CDD4",
  },
  buttonScan: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: "gray",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
});

export default ItemScreen;
