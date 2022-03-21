import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Kinder Kitchen</Text>
      <TextInput style={styles.input} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <View style={styles.btnContainer}>
        {/*
         * Edit this for when login functionality is working
         */}
        <TouchableOpacity
          style={styles.userBtn}
          onPress={() => navigation.navigate("Category")}
        >
          <Text style={styles.btnTxt}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.userBtn}
          onPress={() => navigation.navigate("Sign Up")}
        >
          <Text style={styles.btnTxt}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e90ff",
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#fff",
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  userBtn: {
    backgroundColor: "#FFD700",
    padding: 15,
    width: "45%",
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default LoginScreen;
