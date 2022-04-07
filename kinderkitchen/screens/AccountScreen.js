import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Share,
  ScrollView,
} from "react-native";
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
          "React Native | A framework for building native apps using React",
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
      <Text style={styles.header}>Settings</Text>
      <View style={styles.body}>
        <ScrollView style={styles.scrollView}>
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

          <TouchableOpacity style={styles.ShareButton} onPress={onShare}>
            <Text>Share</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity
          title="1"
          style={styles.LogoutButton}
          //onPress={() => navigation.navigate("Achievements")}
          onPress={() => {
            signOut(auth)
              .then(() => {
                // Sign-out successful.
                alert("You Are Now Signed-Out!\n See You Soon: " + user.email);
              })
              .catch((error) => {
                // An error happened.
                alert(error.code);
              });
            navigation.navigate("Login");
          }}
        >
          <Text>{titleLog}</Text>
        </TouchableOpacity>
      </View>
      <MyNavMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  header: {
    marginTop: 15,
    marginBottom: 10,
    paddingLeft: 5,
    fontSize: 30,
  },

  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    width: "100%",
  },

  recipesButton: {
    marginBottom: 25,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "darkturquoise",
    alignItems: "center",
    width: "50%",
  },
  donatationButton: {
    marginBottom: 25,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "darkturquoise",
    alignItems: "center",
    width: "50%",
  },
  notificationButton: {
    marginBottom: 25,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "darkturquoise",
    alignItems: "center",
    width: "50%",
  },
  achievementsButton: {
    marginBottom: 25,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "darkturquoise",
    alignItems: "center",
    width: "50%",
  },
  ShareButton: {
    marginBottom: 25,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "darkturquoise",
    alignItems: "center",
    width: "50%",
  },
  LogoutButton: {
    marginBottom: 25,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "darkturquoise",
    alignItems: "center",
    width: "50%",
  },
});

export default AccountScreen;
