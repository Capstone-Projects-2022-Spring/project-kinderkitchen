import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Switch, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as Notifications from 'react-native';
import Constants from 'expo-constants';
import storage from "@react-native-async-storage/async-storage";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import MyNavMenu from "../nav-bar/MyNavMenu";



//Notifications.setNotificationHandler({
//    handleNotification: async () => ({
//        shouldShowAlert: true,
//        shouldPlaySound: true,
//        shouldSetBadge: true
//    })
//});


const NotificationScreen = () => {

    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

  
    useEffect(() => {
        const getPermission = async () => {
            if (Constants.isDevice) {
                const { status: existingStatus } = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;
                if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                    alert('Enable push notifications to use the app!');
                    await storage.setItem('expopushtoken', "");
                    return;
                }
                const token = (await Notifications.getExpoPushTokenAsync()).data;
                await storage.setItem('expopushtoken', token);
            } else {
                alert('Must use physical device for Push Notifications');
            }

            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });
            }
        }
        getPermission();

    }, []);
    const onClick = () => {


    }


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
    TouchableOpacity: {
        backgroundColor: "red",
        top: 500,
        color: 'white'
    },
});

export default NotificationScreen;
