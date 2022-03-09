import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import Category from "../screens/Test1";
import Test2 from "../screens/Test2";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Test1" component={Category} />
      <Stack.Screen name="Test2" component={Test2} />
    </Stack.Navigator>
  );
};

export default MyStack;
