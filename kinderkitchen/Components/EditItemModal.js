import MyNavMenu from "../nav-bar/MyNavMenu";
import DropDownPicker from "react-native-dropdown-picker";

import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";

export default function EditItemModal({ thisItemData, categoryData, editItemFunction }) {

  const [modalVisible, setModalVisible] = useState(false);

  /* Drop Down */
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(thisItemData.categoryName);
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


  return (
    <View style={styles.centeredView}>
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
              <Text style={styles.modalText}>Edit Item</Text>
            </View>

            {/*Item Name*/}
            <View style={styles.inputView}>
              <View style={styles.inputTitle}>
                <Text>Item Name:</Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => thisItemData.itemName = newText}
                placeholder={thisItemData.itemName}
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
                onChangeText={(newText) => thisItemData.expirationDate = newText}
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
                placeholder={thisItemData.categoryName}
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
                  submitHandler({ itemName, expirationDate, value }); //Replace when Read is available
                  
                }}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
            {/*END - ButtonField*/}

          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
      <MyNavMenu />
    </View>
  );
};

const styles = StyleSheet.create({
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
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
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
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "seagreen",
    flex: 1,
    justifyContent: "center",
  },
});
