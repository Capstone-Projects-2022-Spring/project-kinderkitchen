import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";

const DonateScreen2 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.mapBox}>
          <Text>Map</Text>
        </View>

        <View style={styles.textBox}>
          <Text>Address that was selected and is displayed on map</Text>
        </View>

        <View style={styles.clickable}>
          <TouchableOpacity
            style={styles.touchableAddress}
            onPress={() => alert("This will copy the address.")}
          >
            <Text style={{ color: "#fff" }}>Copy Address</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchableDonate}
            onPress={() =>
              alert(
                "This will open a page where user can select items to donate from their items."
              )
            }
          >
            <Text>Donate</Text>
          </TouchableOpacity>
        </View>
      </View>
      <MyNavMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: 5,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#E8EAED",
    flex: 1,
    justifyContent: "center",
  },

  mapBox: {
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
    width: "100%",
    borderWidth: 1,
  },

  textBox: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    height: 50,
    width: "100%",
  },

  clickable: {
    margin: 15,
    height: "25%",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  touchableAddress: {
    backgroundColor: "darkturquoise",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    height: 50,
    width: "90%",
    borderWidth: 0.5,
  },
  touchableDonate: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    height: 50,
    width: "90%",
    borderWidth: 0.5,
  },
});

export default DonateScreen2;
