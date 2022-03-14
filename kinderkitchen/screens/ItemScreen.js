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
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import MyNavMenu from "../nav-bar/MyNavMenu";
import Item from "../Components/Item";
import dummyThiccIngredients from "./DummyData";
import HeaderComponent from "../Components/HeaderComponent";

const ItemScreen = ({route}) => {
  console.log("Getting Route");
  console.log(route);
  console.log("Route Params");
  console.log(route.params);
  const {categoryName, CategotyID} = route.params;
  
  const [status, setStatus] = useState(0); //STATUS STATES (0: Good , 1: Aproaching EXP, 2: Expired)



  const [itemName, setItemName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  

  const [modalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  var DATA = [];

  var itemList = [];

  //props.category name
  //props.category_id
  //props.obj?
  //props.item_name

  //For Loop to get all Items from (CATEGORY)
  function showItems() {
    for (let i = 0; i < DATA.length; i++) {
      itemList.push(
        <View key={i}>
          <Item item_name={DATA[i]} />
        </View>
      );
      console.log("Item: " + DATA[i] + " added");
    }
  }
  showItems();
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
        <ScrollView style={{ flex: 1, margin: 5 }}>
          {itemList}

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
                      setModalVisible(!modalVisible);
                      DATA.push(itemName, expirationDate, value);
                      console.log(DATA);
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
});

export default ItemScreen;
