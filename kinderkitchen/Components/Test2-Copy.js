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

const Test2 = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  return (
    <View style={styles.centeredView}>
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
              <TextInput style={styles.input} /*Make CharacterLimit*/ />
            </View>

            {/*Expiration Date*/}
            <View style={styles.inputView}>
              <View style={styles.inputTitle}>
                <Text>Expiration Date:</Text>
              </View>
              <TextInput style={styles.input} /*Make CharacterLimit*/ />
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
                onPress={() => setModalVisible(!modalVisible)}
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

export default Test2;
