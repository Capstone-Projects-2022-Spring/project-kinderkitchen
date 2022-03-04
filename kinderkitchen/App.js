import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Kinder Kitchen</Text>
          <TextInput
              style={styles.input}
              placeholder="Username"
          />
          <TextInput
              style={styles.input}
              placeholder="Password"
          />
          <View>
              <TouchableOpacity>
                  <Text>Login</Text>
              </TouchableOpacity>
          </View>
    </View>
  );
}
          

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    justifyContent: 'center',
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: "#fff",
        fontFamily: "DancingScript-Bold"
    },
    input: {
        width: "90%",
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10
    }

});
