import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import MyNavMenu from "../nav-bar/MyNavMenu";

const AccountScreen = ({ navigation }) => {
  const titleAcc = "Account";
  const titleAch = "Achievements";
  const titleNot = "Notifications";

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Settings</Text>
        <Text style={styles.acc}>{titleAcc}</Text>
        <Text style={styles.accTextRecipe}># of completed recipes</Text>
        <Text style={styles.accTextDonation}># of completed donations</Text>
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
        <Button
          title="Scan"
          onPress={() => navigation.navigate("Barcode")}
        ></Button>
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
    marginTop: 40,
    marginRight: 250,
    fontSize: 30,
  },
  acc: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    position: "absolute",
    top: 100,
    right: 250,
    fontSize: 20,
    justifyContent: "space-evenly",
    color: "#fff",
  },
  accTextRecipe: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    position: "absolute",
    top: 130,
    right: 170,
    justifyContent: "space-evenly",
    color: "#fff",
  },
  accTextDonation: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    position: "absolute",
    top: 160,
    right: 155,
    justifyContent: "space-evenly",
    color: "#fff",
  },
  notificationButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#FFD700",
    position: "absolute",
    top: 220,
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
    top: 280,
    right: 230,
    justifyContent: "space-evenly",
  },
});

export default AccountScreen;
