import React, { useState } from "react";
import { StyleSheet, Text, View, Switch, Alert } from "react-native";
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
            trackColor={{ false: "#767577", true: "darkturquoise" }}
            thumbColor={isEnabled ? "#fff" : "#fff"}
            onValueChange={toggleSwitch}
            value={isEnabled}
            //onToggle={isOn => alert("Notification has been enabled", isOn)}
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
              setValue={setValue => alert("Notification has been enabled to two days prior expiration date")}
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
    flex: 1,
    justifyContent: "center",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyAllowNot: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  bodyReminder: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  allowNot: {
    fontSize: 20,
  },
  reminder: {
    flex: 1,
    fontSize: 20,
  },
  dropDown: {
    width: "33%",
  },
});

export default NotificationScreen;
