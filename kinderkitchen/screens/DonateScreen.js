import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
  Dimensions,
  Modal,
  Pressable
} from "react-native";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import MapView, { Marker, Callout, AnimatedRegion, Animated } from 'react-native-maps';

import { MaterialIcons } from "@expo/vector-icons";

import MyNavMenu from "../nav-bar/MyNavMenu";

const DonateScreen = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [currentLatitude, setCurrentLatitude] = useState(37.78825);
  const [currentLongitude, setCurrentLongitude] = useState(-122.4324);
  const [newMarkerAddress, setNewMarkerAddress] = useState();
  const [pressedAddress, setPressedAddress] = useState();
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  })

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
  
    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  
    let { coords } = await Location.getCurrentPositionAsync();
  
    if (coords) {
      const { latitude, longitude } = coords;
      setCurrentLatitude(latitude);
      setCurrentLongitude(longitude);
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
  
      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
  
        setDisplayCurrentAddress(address);
      }
    }
  };


  

  return (
    <View style={styles.container}>
      <View style={styles.body}>
      <TextInput
        placeholder= {displayCurrentAddress}
        editable = {false}

        ></TextInput>
               

        <View style={{flex: 1}}>
          <GooglePlacesAutocomplete 
            styles={{container: {flex: 0, position: 'absolute', width: "100%", zIndex: 1},
                     listView: {backgroundColor: 'white'}}}

            placeholder='Search'
            fetchDetails={true}
            GooglePlacesSearchQuery={{
                rankby: "distance"

            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
              setRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              })
              setNewMarkerAddress(data.description);
            }}
            query={{
              key: '',            /////////////NAVIGATION API KEY HERE
              language: 'en',
              components: "country:us",
              types: "establishment",
              radius: 30000,
              location: {displayCurrentAddress}
            }}
            
          />
          <MapView style={styles.map}
            region={{
              latitude: currentLatitude,
              longitude: currentLongitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
              <Marker
                coordinate={{latitude: region.latitude, longitude: region.longitude}}
              >
                <Callout
                onPress={() => {
                  setPressedAddress(newMarkerAddress);
                  setModalVisible(true);
                  
                }}>
                  
                  <Text>GetAddress</Text>
                  
                </Callout>
              </Marker>
             <Marker 
              coordinate={{
                latitude: currentLatitude,
                longitude: currentLongitude
              }}>
              <Callout>
                <Text> {displayCurrentAddress}</Text>
              </Callout>
            </Marker>
          </MapView>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <MaterialIcons
              name="close"
              size={24}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModalVisible(false)}
            />

            {/*Header*/}
            <View style={styles.modalHeader}>
              <Text style={styles.modalText}>Address</Text>
            </View>

            {/*Address*/}
            <View>
            <Text style={styles.modalText}>{pressedAddress}</Text>
            </View>

            {/*ButtonField*/}
            <View style={styles.submissionField}>
              {/*Submit Button*/}
              <Pressable
                style={[styles.button, styles.buttonSubmit]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  alert("This will navigate to Doanation Page Stay Tuned!");
                  //navigation.navigate("Category", pressedAddress);//Navigate to Donation Selection
                }}>
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>

            </View>
          </View>
        </View>
      </Modal>
    </View>
    <MyNavMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: 5,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#E8EAED",
    flex: 1,
    justifyContent: "center",
  },

  searchBar: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    width: "70%",
    backgroundColor: "#fff",
    marginRight: 5,
    paddingLeft: 5,
  },
  userBtn: {
    backgroundColor: "#FFD700",
    height: "100%",
    width: "25%",
  },

  mapBox: {
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
    width: "100%",
    borderWidth: 1,
  },

  addressList: {
    borderWidth: 1,
    width: "100%",
    marginBottom: 5,
  },
  touchable: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    height: 50,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modalHeader: {
    width: "100%",
    padding: 35,
    paddingTop: 10,
    paddingBottom: 0,
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },

  //Bottom Section to Hold Buttons
  submissionField: {
    width: "100%",
    flexDirection: "row",
    borderTopColor: "gray",
    borderTopWidth: 1,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonSubmit: {
    width: "33%",
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: "#12CDD4",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalToggle: {
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 8,
    top: 7,
    right: 120,
    borderRadius: 10,
    //alignSelf: 'center',
  },
  modalClose: {
    marginTop: 10,
    marginBottom: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  //The Pop-Up Box
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DonateScreen;
