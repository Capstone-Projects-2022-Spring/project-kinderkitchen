import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import auth from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();

  //const auth2 = getAuth();
  const signInHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        navigation.reset({
          index: 0,
          routes: [{ name: "Category" }],
        });
        //navigation.navigate("Category"); //Pass in User?
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error Code: " + errorCode);
        console.log("Error Message: " + errorMessage);
        if (errorCode === "auth/user-not-found") {
          alert("Oops! Could not find user with\n Email: " + email);
        }
        if (errorCode === "auth/wrong-password") {
          alert("Incorrect password. \nPlease try again.");
        }
        if (errorCode === "auth/missing-email") {
          alert("Missing Email Parameter");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Kinder Kitchen</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View style={styles.btnContainer}>
        {/*Login Button*/}
        <TouchableOpacity
          style={styles.userBtn}
          onPress={() => signInHandler()}
        >
          <Text style={styles.btnTxt}> Login </Text>
        </TouchableOpacity>

        {/*SignUp Button*/}
        <TouchableOpacity
          style={styles.userBtn}
          onPress={() => navigation.navigate("Sign Up")}
        >
          <Text style={styles.btnTxt}> Signup </Text>
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
