import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";

const DonationQueue = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <ScrollView style={styles.addressList}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.navigate("Confirm Donation")}
          >
            <Text>Address 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.navigate("Confirm Donation")}
          >
            <Text>Address 2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.navigate("Confirm Donation")}
          >
            <Text>Address 3</Text>
          </TouchableOpacity>
        </ScrollView>
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

  addressList: {
    borderWidth: 1,
    width: "100%",
    marginBottom: 5,
  },
  touchable: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    height: 50,
  },
});

export default DonationQueue;
