import React from "react";
import { StyleSheet, Text, SafeAreaView, Image } from "react-native";

const Achievement = ({ donationCount, recipesCompleted }) => {
  function selectAchievement(count, title) {
    let theTitle = title + count;
    let tier = "Locked";
    let imageColor = "grey";
    let nextComplete = 1;
    if (count < 1) {
      //Use Default
    } else if (count < 5) {
      tier = "Tier I";
      imageColor = "bronze";
      nextComplete = 5;
    } else if (count < 15) {
      //locked
      tier = "Tier II";
      imageColor = "silver";
      nextComplete = 15;
    } else if (count >= 15) {
      tier = "Tier III";
      imageColor = "Gold";
      nextComplete = "?";
    }
    return (
      <SafeAreaView style={styles.safeView}>
        <Text style={styles.achieveName}>{theTitle}</Text>
        {/* <Image></Image> //Thingy Goes here */}
        <Text>{tier}</Text>
        <Text>Next Tier at {nextComplete}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      {/* Donation Achievement */}
      {selectAchievement(donationCount, "Donations Completed: ")}
      {selectAchievement(recipesCompleted, "Recipes Completed: ")}
    </SafeAreaView>
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
  achieveName: {
    justifyContent: "space-evenly",
    textAlign: "center",
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  calories: {
    justifyContent: "space-evenly",
    textAlign: "center",
    fontSize: 18,
  },
  recipeImage: {
    justifyContent: "space-evenly",
    alignSelf: "center",
    width: 300,
    height: 300,
    borderRadius: 5,
  },
  ingredients: {
    justifyContent: "flex-start",
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 5,
  },
    safeView: {
    bottom: 261,
    borderColor: "#C4A484",
    borderBottomWidth: 2.5,
    borderTopWidth: 10,
    borderLeftWidth: 10,
    borderRightWidth: 10,
  },
});

export default Achievement;
