import React from "react";
import { StyleSheet, View } from "react-native";

const AchievementScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.body}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AchievementScreen;
