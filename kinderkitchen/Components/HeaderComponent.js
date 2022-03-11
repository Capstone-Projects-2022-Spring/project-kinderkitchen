import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function HeaderComponent(props) {
    if (props.title){
    return (<View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
    </View>);
    }
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: 'coral'
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold'
    },
});