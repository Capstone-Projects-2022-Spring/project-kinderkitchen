import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Home from "../screens/Home";
import Test2 from "../screens/Test2";
import ItemScreen from "../screens/ItemScreen";
import AccountScreen from "../screens/AccountScreen";
import NotificationScreen from "../screens/NotificationScreen";
import AchievementScreen from "../screens/AchievementScreen";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Test2" component={Test2} />
      <Stack.Screen name="ItemScreen" component={ItemScreen} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="AchievementScreen" component={AchievementScreen} />
    </Stack.Navigator>
  );
};

export default MyStack;
