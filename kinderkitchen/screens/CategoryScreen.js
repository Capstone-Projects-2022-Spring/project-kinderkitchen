import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Pressable, TextInput, Modal, Button } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";
import AddCategory from "../Components/AddCategory";

import { getDatabase, onValue, set, get, ref, child, push, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CategoryItem from "../Components/CategoryItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';



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

    /*  These are for the edit name func */
    const [modalVisible, setModalVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState();
    const [categoryNameToEdit, setCategoryNameToEdit] = useState();




    const renderItem = ({ item, index }) => {
        <TouchableOpacity
            style={styles.itm}
            onLongPress={() => onPressItem(item)}

        >
            <Text style={styles.text}>{itm.text}</Text>

        </TouchableOpacity>
    }


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
                    <CategoryItem categoryName={key} deleteCategoryFunction={deleteCategory} editCategoryFunction={editCategory} />
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
        if (hasItems) { alert("Cannot Delete, Category has Items! \nOverride comming soon!"); return; }
        let localData = categoryData;
        localData[categoryName] = null;
        /* Once Items Have DB Ref. Remove Category From Items DB Table */
        setCategoryData(localData);
        const updates = {};
        updates['users/' + auth.currentUser.uid + '/categories/'] = categoryData;
        alert("Deletion Success!\nKnown Bug: Page does not update.\n\nLog out and back in to see change.")
        return update(ref(database), updates);
    }

    //This Function will Reveal the Modal to edit specified Category
    function editCategory(categoryNameToEdit) {
        setModalVisible(true);
        setCategoryNameToEdit(categoryNameToEdit);
    }

    function onPressSaveEdit() {
        setModalVisible(false);
        ////Something going on here that I cant solve
        alert("Changing " + categoryNameToEdit + " To " + newCategoryName);
    }

    /* Display Content */
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <ScrollView style={styles.scrollView}>

                    {/*   Display Categories   */}
                    {displayData()}




                </ScrollView>

                {/*   Add Category Field   */}
                <AddCategory submitHandler={addCategory} userID={currentUserID} />
            </View>

            {/* Edit Item Modal */}
            <Modal
                animationType='fade'
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
                            name='close'
                            size={24}
                            style={{ ...styles.modalToggle, ...styles.modalClose }}
                            onPress={() => setModalVisible(false)}
                        />

                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => setNewCategoryName(text)}
                            defaultValue={""}
                            editable={true}
                            multiline={false} e
                            maxLength={200}
                        />
                        <TouchableOpacity
                            onPress={() => onPressSaveEdit()}
                            style={styles.touchableSave}
                        >
                            <Text style={styles.text}> Save </Text>

                        </TouchableOpacity>
                        

                    </View>
                </View>
            </Modal>

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
        width: "40%",
        backgroundColor: "#fff",
        paddingHorizontal: 5,
        marginBottom: 8,
        borderColor: "black",
        borderWidth: 1,
    },
    touchableSave: {
        backgroundColor: 'orange',
        paddingHorizontal: 100,
        alignItems: 'center',
        marginTop: 20,
    },
    itm: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        alignItems: 'flex-start'
    },
    text: {
        marginVertical: 30,
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },

    //MODAL Styles
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalToggle: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 8,
        top: 7,
        right: 120,
        borderRadius: 10,
        //alignSelf: 'center',
    },
    modalClose: {
        marginTop: 10,
        marginBottom: 0,
    }

});

export default CategoryScreen;