import { NavigationContainer } from "@react-navigation/native";

import MyStack from "./routes/MyStack";

//from kk-12
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}