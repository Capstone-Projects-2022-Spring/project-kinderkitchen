
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text,Button, FlatList, TouchableOpacity } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";
import { TextInput } from "react-native-gesture-handler";
import HeaderComponent from "../Components/HeaderComponent";
import TodoItem from "../Components/TodoItem";
import AddTodo from "../Components/addTodo";



const CategoryScreen = (props) => {

    const [todos, setTodos] = useState([
        { text: 'Pantry', key: '1' },
        { text: 'Fridge', key: '2' },
        { text: 'Fruit', key: '3' }
    ]);

    {/*   This is a function that does the deleting from the list by long pressing on the item */ }
    const pressHandler = (key) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.key != key)
        })
    }

    const submitHandler = (text) => {
        setTodos((prevTodos) => {
            return [
                {text: text, key: Math.random().toString()},
                ...prevTodos
            ]

        })

    }
   
    return (
        <View style={styles.container}>
            {/*   This is the Header */}
            {props.category_name ? <HeaderComponent title={props.category_name} /> : <HeaderComponent title="Categories" />/*If no title provided*/}
            
            <View style={styles.content}>
                {/*   Content   */}
                <AddTodo submitHandler={submitHandler}/>


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
        padding:40,
        
    },
    list: {
        marginTop: 20,
      
    },
    
    
});

export default CategoryScreen;