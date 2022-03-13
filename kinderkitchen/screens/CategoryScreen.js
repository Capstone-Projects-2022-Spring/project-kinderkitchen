
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Alert, TouchableOpacity } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";
import Item from "../Components/Item"
import { TextInput } from "react-native-gesture-handler";
import HeaderComponent from "../Components/HeaderComponent";

const CategoryScreen = (props) => {

   
    return (
        <View style={styles.container}>
            {props.category_name ? <HeaderComponent title={props.category_name} /> : <HeaderComponent title="Categories" />/*If no title provided*/}
            

            <ScrollView style={styles.scrollContainer}>
                
            </ScrollView>


            <View style={styles.footer}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='+ Enter Category Name'
                    placeholderTextColor='#fff'
                    underlineColorAndroid='transparent'>
                </TextInput>
            </View>

            <TouchableOpacity style={styles.addButton}>
                <Text>Add</Text>
            </TouchableOpacity>


            <MyNavMenu />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        //backgroundColor: 'coral',
        //alignItems: 'center',
        //justifyContent: 'center',
        //borderBottomWidth: 10,
        //borderBottomColor: '#ddd',
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        padding: 26,

    },
    TextInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 10,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: "coral",
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation:8,
    },
    addButtonText: {
        backgroundColor: "#2196F3",
    },
});

export default CategoryScreen;