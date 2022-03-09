import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App(props) {
  const {titleAcc='Account', titleAch='Achievements', titleNot='Notifications'} = props
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.acc}>{titleAcc}</Text>
      <Text style={styles.accTextRecipe}># of completed recipes</Text>
      <Text style={styles.accTextDonation}># of completed donations</Text>  
      <TouchableOpacity title="Notifications" style={styles.notificationButton}>
        <Text>{titleAch}</Text>  
      </TouchableOpacity>
      <TouchableOpacity title="Achievements" style={styles.achievementsButton}>
        <Text>{titleNot}</Text>  
      </TouchableOpacity>
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
  header: {
    flex: 1,
    color: '#fff',
    marginTop: 40,
    marginRight: 250,
    fontSize: 30,
  },
  acc: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    position: 'absolute',
    top: 100,
    right: 250,
    fontSize: 20,
    justifyContent: 'space-evenly',
    color: '#fff'
  },
  accTextRecipe: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    position: 'absolute',
    top: 130,
    right: 170,
    justifyContent: 'space-evenly',
    color: '#fff'
  },
  accTextDonation: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    position: 'absolute',
    top: 160,
    right: 155,
    justifyContent: 'space-evenly',
    color: '#fff'
  },
  notificationButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#FFD700',
    position: 'absolute',
    top: 220,
    right: 220,
    justifyContent: 'space-evenly'
  },
  achievementsButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#FFD700',
    position: 'absolute',
    top: 280,
    right: 230,
    justifyContent: 'space-evenly'
  },
});
