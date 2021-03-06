import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ItemScreen from "../screens/ItemScreen";
import AccountScreen from "../screens/AccountScreen";
import CategoryScreen from "../screens/CategoryScreen";
import NotificationScreen from "../screens/NotificationScreen";
import AchievementScreen from "../screens/AchievementScreen";

import DonateScreen from "../screens/DonateScreen";
import DonateSelect from "../screens/DonateSelect";
import BarcodeScreen from "../screens/BarcodeScreen";
import RecipeScreen from "../screens/RecipeScreen";
import RecipeSearchScreen from "../screens/RecipeSearchScreen";
import RecipeCustomSearchScreen from "../screens/RecipeCustomSearchScreen";
import RecipeSaved from "../screens/RecipeSaved";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Items" component={ItemScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Achievements" component={AchievementScreen} />
      <Stack.Screen name="Search Food Banks" component={DonateScreen} />
      <Stack.Screen name="Donate Items" component={DonateSelect} />
      <Stack.Screen name="Barcode" component={BarcodeScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="Recipe Search" component={RecipeSearchScreen} />
      <Stack.Screen
        name="Custom Recipe Search"
        component={RecipeCustomSearchScreen}
      />
      <Stack.Screen name="Saved Recipes" component={RecipeSaved} />
    </Stack.Navigator>
  );
};

export default MyStack;
