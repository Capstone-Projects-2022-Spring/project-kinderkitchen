import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';


export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#1e90ff"
                barStyle="light-content"
            />

            <Text style={styles.welcome}>Welcome to Kinder Kitchen</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.userBtn}

                >
                    <Text style={styles.btnTxt}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.userBtn}
                >
                    <Text style={styles.btnTxt}>Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e90ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: "#fff",

    },
    input: {
        width: "90%",
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%"
    },
    userBtn: {
        backgroundColor: "#FFD700",
        padding: 15,
        width: "45%"
    },
    btnTxt: {
        fontSize: 18,
        textAlign: "center"
    }

});