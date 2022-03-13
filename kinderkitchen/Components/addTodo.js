import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";



export default function AddTodo() {

    const [text, setText] = useState('');
    
    const changeHandler = (val) => {
        setText(val)

    }

    return (
        <View style={styles.footer}>
            <TextInput
                style={styles.TextInput}
                placeholder='+ Enter Category Name'
                onChangeText={changeHandler}
                placeholderTextColor='#fff'
                underlineColorAndroid='transparent'>
                
            </TextInput>
        </View>

      


        )

}

const styles = StyleSheet.create({
    TextInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 10,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed'
    }
});