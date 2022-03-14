import React, { useState } from "react";
import { StyleSheet, Text, View, Switch, Menu, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import MyNavMenu from "../nav-bar/MyNavMenu";

const NotificationScreen = () => {
  const textNot = "Notifications";
  const allowNot = "Allow Notifications";
  const reminder = "Reminder for Expiration Date";
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Select", value: "select" },
    { label: "1 Day", value: "1 day" },
    { label: "2 Days", value: "2 days" },
    { label: "5 Days", value: "5 days" },
    { label: "1 Week", value: "1 week" },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.bodyAllowNot}>
          <Text style={styles.allowNot}>{allowNot}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <View style={styles.bodyReminder}>
          <Text style={styles.reminder}>{reminder}</Text>
          <View style={styles.dropDown}>
            <DropDownPicker
              placeholder="Select"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
        </View>
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
  bodyAllowNot: {
    backgroundColor: "#1e90ff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  bodyReminder: {
    flex: 1,
    backgroundColor: "#1e90ff",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  allowNot: {
    fontSize: 20,
    color: "#fff",
  },
  reminder: {
    flex: 1,
    fontSize: 20,
    color: "#fff",
  },
  dropDown: {
    width: "33%",
  },
});

export default NotificationScreen;
