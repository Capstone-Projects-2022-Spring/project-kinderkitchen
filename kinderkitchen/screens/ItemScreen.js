import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Button, FlatList, TextInput } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";
import Item from "../Components/Item"
import HeaderComponent from "../Components/HeaderComponent";
import TodoItem from "../Components/TodoItem";
import AddTodo from "../Components/addTodo";




const ItemScreen = (props) => {

    {/*   This array for defult category name */ }
    const [text, setText] = useState('');
    const [todos, setTodos] = useState([
        { text: 'Milk', key: Math.random().toString() },
    ]);

    {/*   This is a function that does the deleting from the list by long pressing on the item */ }
    const pressHandler = (key) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.key != key)
        })
    }

    {/*   This is a function that does the adding*/ }
    const submitHandler = (text) => {
        setTodos((prevTodos) => {
            return [
                { text: text, key: Math.random().toString() },
                ...prevTodos
            ]

        })

    }

    const changeHandler = (val) => {
        setText(val)

    }

    return (

        <View style={styles.container}>

            {props.category_name ? <HeaderComponent title={props.category_name} /> : <HeaderComponent title="CATEGORY_NAME" />/*If no title provided*/}

            <View style={styles.content}>
                {/*   Content   */}
                <View style={styles.footer}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder='Enter Item'
                        onChangeText={changeHandler}
                        placeholderTextColor='#252525'
                        underlineColorAndroid='transparent'>
                    </TextInput>

                    <Button onPress={() => submitHandler(text)} title='add' style={styles.button} />

                </View>

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




            <MyNavMenu />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 40,

    },
    list: {
        marginTop: 20,

    },
    TextInput: {
        alignSelf: 'stretch',
        color: '#252525',
        padding: 10,
        backgroundColor: '#ddd',
        borderTopWidth: 2,
        borderTopColor: '#ededed'
    },
});

export default ItemScreen;
