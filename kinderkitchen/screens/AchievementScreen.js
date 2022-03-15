import React, { useState } from "react";
import { StyleSheet, Text, View, Switch, Menu, Button } from "react-native";

const AchievementScreen = () => {
  const textAch = "Achievements";

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>{textAch}</Text>
      </View>
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
});

export default AchievementScreen;
