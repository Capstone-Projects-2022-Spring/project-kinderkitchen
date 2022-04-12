import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";

const SearchFoodBanks = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.searchBar}>
          <TextInput style={styles.input} placeholder="Enter Address" />
          <TouchableOpacity style={styles.userBtn}>
            <Text
              style={styles.btnTxt}
              onPress={() =>
                alert(
                  "This will search and display on the map any nearby foodbanks."
                )
              }
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mapBox}>
          <Text>Map</Text>
        </View>

        <ScrollView style={styles.addressList}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.navigate("Food Bank")}
          >
            <Text>Address 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.navigate("Food Bank")}
          >
            <Text>Address 2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.navigate("Food Bank")}
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

  searchBar: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    width: "70%",
    backgroundColor: "#fff",
    marginRight: 5,
    paddingLeft: 5,
  },
  userBtn: {
    backgroundColor: "#FFD700",
    height: "100%",
    width: "25%",
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

export default SearchFoodBanks;
