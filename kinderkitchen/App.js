import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

import MyStack from "./routes/MyStack";

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
