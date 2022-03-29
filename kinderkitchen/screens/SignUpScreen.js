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
import { getDatabase, set, ref, child, push, update } from "firebase/database";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const database = getDatabase();

  function writeUserData(userId, email) {
    set(ref(database, 'users/' + userId), { email: email });
    set(ref(database, 'users/' + userId +'/categories/'), {
      Fridge: false, 
      Pantry: false}); //On New Item Add, Set to true
      set(ref(database, 'users/' + userId +'/items/'), {}); //Add Category Name that was set to true as an ID,
                                                            //Then add Item with all data - MIGRATE TO ITEM ADD does not initalize
  }

  const createUserHandler = () => {

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      writeUserData(userCredential.user.uid, email)
      navigation.navigate("Category"); //Navigate to AccountScreen? or WelcomeIntro?
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

      <TextInput style={styles.input} placeholder="Email" onChangeText={text => setEmail(text)} />
      <TextInput style={styles.input} placeholder="Password" onChangeText={text => setPassword(text)} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" onChangeText={text => setPassword2(text)} secureTextEntry />

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
