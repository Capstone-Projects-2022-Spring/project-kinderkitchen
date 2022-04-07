import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Share, Button  } from "react-native";
import MyNavMenu from "../nav-bar/MyNavMenu";
import { getAuth, signOut } from "firebase/auth";

const AccountScreen = ({ navigation }) => {
  const titleAcc = "Account";
  const titleAch = "Achievements";
  const titleNot = "Notifications";
  const titleLog = "Logout";
  const titleRecipe = "Recipes";
  const titleDonation = "Donation";


 const auth = getAuth();
 const user = auth.currentUser;

    
        const onShare = async () => {
            try {
                const result = await Share.share({
                    message:
                        'React Native | A framework for building native apps using React',
                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared with activity type of result.activityType
                    } else {
                        // shared
                    }
                } else if (result.action === Share.dismissedAction) {
                    // dismissed
                }
            } catch (error) {
                alert(error.message);
            }
        };


  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Settings</Text>
        
              
        <TouchableOpacity
          title="1"
          style={styles.recipesButton}
          //onPress={() => navigation.navigate("Recipes")}
        >
          <Text>{titleRecipe}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          title="1"
          style={styles.donatationButton}
          //onPress={() => navigation.navigate("Recipes")}
        >
          <Text>{titleDonation}</Text>
        </TouchableOpacity>
          

        <TouchableOpacity
          title="Notifications"
          style={styles.notificationButton}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Text>{titleNot}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="1"
          style={styles.achievementsButton}
          onPress={() => navigation.navigate("Achievements")}
        >
          <Text>{titleAch}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  title="1"
                  style={styles.LogoutButton}
                  //onPress={() => navigation.navigate("Achievements")}
                  onPress={() => {
                      signOut(auth).then(() => {
                          // Sign-out successful.
                          alert("You Are Now Signed-Out!\n See You Soon: " + user.email);
                      }).catch((error) => {
                          // An error happened.
                          alert(error.code);
                      });
                      navigation.navigate("Login");
                  }}
              >
                  <Text>{titleLog}</Text>
              </TouchableOpacity>

              <TouchableOpacity                 
                  style={styles.ShareButton}
                  onPress={onShare}
              >
                  <Text>Share</Text>
              </TouchableOpacity>

      </View>
      <MyNavMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#56ff9f",
    flex: 1,
    justifyContent: "center",
  },
  body: {
    flex: 1,
    backgroundColor: "#1e90ff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    color: "#fff",
    marginTop: 15,
    marginRight: 250,
    fontSize: 30,
  },
 
    recipesButton: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#FFD700",
        position: "absolute",
        top: 90,
        right: 267,
        justifyContent: "space-evenly",
    },
    donatationButton: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#FFD700",
        position: "absolute",
        top: 180,
        right: 262,
        justifyContent: "space-evenly",
    },
  
  notificationButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#FFD700",
    position: "absolute",
    top: 280,
    right: 238,
    justifyContent: "space-evenly",
  },
  achievementsButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#FFD700",
    position: "absolute",
    top: 380,
    right: 230,
    justifyContent: "space-evenly",
    },
    ShareButton: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#FFD700",
        position: "absolute",
        top: 470,
        right: 270,
        justifyContent: "space-evenly",
    },
    LogoutButton: {
        paddingVertical: 12,
        paddingHorizontal: 49,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#FFD700",
        position: "absolute",
        top: 570,
        right: 130,
        justifyContent: "space-evenly",
    },
});

export default AccountScreen;
