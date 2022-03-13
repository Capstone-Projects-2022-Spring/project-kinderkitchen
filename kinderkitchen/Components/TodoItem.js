import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

{/*   This is a class that is related to the content of the list (design + displaying ) */ }
export default function TodoItem({ item, pressHandler }) {

    return (
        
        <TouchableOpacity onPress={() => pressHandler(item.key)}>
            <Text style={styles.item}>{item.text}</Text>
            </TouchableOpacity>
        )

}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginTop: 10,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10
    }

})