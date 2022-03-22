import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import auth from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [zipCode, setZipCode] = useState('');



  const createUserHandler = () => {

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('User account created & (maybe) signed in!');
      navigation.navigate("Category");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.log(errorCode);
      console.log(errorMessage);
      console.error(error);
    });

  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>New Account</Text>

      <TextInput style={styles.input} placeholder="Username" onChangeText={text => setUsername(text)} />
      <TextInput style={styles.input} placeholder="Password" onChangeText={text => setPassword(text)} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" onChangeText={text => setPassword2(text)} secureTextEntry />
      <TextInput style={styles.input} placeholder="Email" onChangeText={text => setEmail(text)} />
      <TextInput style={styles.input} placeholder="Zip Code" onChangeText={text => setZipCode(text)} />

      <View style={styles.btnContainer}>
        
        {/* Submit SignUp */}
        <TouchableOpacity style={styles.userBtn}
          onPress={() => {
            if (password != password2) { alert("Passwords Do Not Match"); return; } //Password Failure
            createUserHandler(); 
          }
        }
        >
          <Text style={styles.btnTxt}> Signup </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.btnTxt}> Cancel </Text>
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

export default SignUpScreen;
