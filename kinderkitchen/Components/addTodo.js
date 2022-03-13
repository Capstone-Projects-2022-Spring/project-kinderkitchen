import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from "react-native";



export default function AddTodo({ submitHandler }) {

    const [text, setText] = useState('');

    const changeHandler = (val) => {
        setText(val)

    }

    return (

        <View style={styles.footer}>
            <TextInput
                style={styles.TextInput}
                placeholder='Enter Category Name'
                onChangeText={changeHandler}
                placeholderTextColor='#252525'
                underlineColorAndroid='transparent'>
            </TextInput>

            <Button onPress={() => submitHandler(text)} title='add' style={styles.button} />

        </View>

    )

}

const styles = StyleSheet.create({
    TextInput: {
        alignSelf: 'stretch',
        color: '#252525',
        padding: 10,
        backgroundColor: '#ddd',
        borderTopWidth: 2,
        borderTopColor: '#ededed'
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
        elevation: 8,
    },
    addButtonText: {
        backgroundColor: "#2196F3",
    },
});