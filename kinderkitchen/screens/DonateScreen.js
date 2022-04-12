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
} from "react-native";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import MapView, { Marker, Callout, AnimatedRegion, Animated } from 'react-native-maps';

import MyNavMenu from "../nav-bar/MyNavMenu";

const DonateScreen = ({ navigation }) => {

  const API_KEY = '5f20539b0f6383f1f2118885331abaecfa3e003ec92a5febc2a45707e758667f';

  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [currentLatitude, setCurrentLatitude] = useState(37.78825);
  const [currentLongitude, setCurrentLongitude] = useState(-122.4324);
  const [newMarkerAddress, setNewMarkerAddress] = useState();
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
              key: 'AIzaSyBf6Gc2aa1cznIUyFro-KQihb-3KZTNFYo',
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
                onPress={() => alert(newMarkerAddress)}>
                  
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
});

export default DonateScreen;
