import { NavigationContainer } from "@react-navigation/native";

import MyStack from "./routes/MyStack";

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
