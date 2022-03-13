
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, FlatList, TouchableOpacity } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";
import { TextInput } from "react-native-gesture-handler";
import HeaderComponent from "../Components/HeaderComponent";
import TodoItem from "../Components/TodoItem";



const CategoryScreen = (props) => {

    const [todos, setTodos] = useState([
        { text: 'buy coffee', key: '1' },
        { text: 'Go to the gym', key: '2' },
        { text: 'Study for Network', key: '3' }
    ]);

    {/*   This is a function that does the deleting from the list by long pressing on the item */ }
    const pressHandler = (key) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.key != key)
        })
    }
   
    return (
        <View style={styles.container}>
            {/*   This is the Header */}
            {props.category_name ? <HeaderComponent title={props.category_name} /> : <HeaderComponent title="Categories" />/*If no title provided*/}
            
            <View style={styles.content}>
                {/*   Content   */}

                <View style={styles.list}>
                    {/*   this list thru array and display   */}

                    <FlatList
                        data={todos}
                        renderItem={({ item }) => (
                            <TodoItem item={item} pressHandler={pressHandler} />
                        )}
                    />
                </View>
            </View>


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

            <TouchableOpacity style={styles.button} >
                <Text>Add</Text>
            </TouchableOpacity >


            <MyNavMenu />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding:40,
        
    },
    list: {
        marginTop: 20,
      
    },
    TextInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 10,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    button: {
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