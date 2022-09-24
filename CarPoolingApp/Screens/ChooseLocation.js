import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from "react-native-geocoding";
import { ref, update } from "firebase/database";
import { db } from "../components/config";
import { data1 } from "./LoginScreen1";

const GOOGLE_MAPS_APIKEY = "AIzaSyC0Dyzm19O_8w3tnmmymll2QUSnttZLVv4";
const { width, height } = Dimensions.get("window");

const ChooseLocation = ({ navigation }) => {
  const [destinationCords, setDestinationCords] = useState({});
  const [placeholderName, setPlaceholderName] = useState(
    "Enter Destination Location"
  );

  const onPressAddress = (data, details) => {
    if (data.description) {
      setPlaceholderName(data.description);
    }

    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;

    setDestinationCords({
      ...destinationCords,
      latitude: lat,
      longitude: lng,
    });
  };

  useEffect(() => {
    if (Object.keys(destinationCords).length !== 0) {
      Geocoder.from(destinationCords.latitude, destinationCords.longitude)
        .then((json) => {
          var addressComponent = json.results[0].address_components;
          let countryIDX = 0;
          let townIDX = 0;

          addressComponent.map((obj, idx) => {
            if (obj.types[0] === "locality") townIDX = idx;
            if (obj.types[0] === "country") countryIDX = idx;
          });

          update(ref(db, "usersLocation/" + data1.userName), {
            endLocation: {
              latitude: destinationCords.latitude,
              longitude: destinationCords.longitude,
              town: addressComponent[townIDX].long_name,
              country: addressComponent[countryIDX].long_name,
            },
          })
            .then(() => {
              //hello
            })
            .catch((error) => {
              Alert.alert(error);
            });
        })
        .catch((error) => console.warn(error));

      navigation.navigate("map", { destinationCords });
      setPlaceholderName("Enter Destination Location");
    }
  }, [Object.keys(destinationCords).length]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          width: 30,
          marginTop: 27,
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={30} color="grey" />
      </TouchableOpacity>
      <View
        style={{
          width: width / 1.17,
          marginRight: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        <GooglePlacesAutocomplete
          placeholder={placeholderName}
          textInputProps={{
            placeholderTextColor: "grey",
          }}
          fetchDetails={true}
          onPress={onPressAddress}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          styles={{
            textInputContainer: {
              flexDirection: "row",
            },
            textInput: {
              backgroundColor: "#263f3f",
              width: width,
              alignSelf: "center",
              height: 45,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 6,
              color: "white",
            },
            poweredContainer: {
              height: 0,
              backgroundColor: "#353535",
            },
            powered: {
              height: 0,
              backgroundColor: "#353535",
            },
            listView: {},
            row: {
              backgroundColor: "#353535",
              color: "white",
              padding: 13,
              height: 45,
              flexDirection: "row",
            },
            separator: {
              height: 0,
              backgroundColor: "#353535",
            },
            description: {
              color: "white",
            },
            loader: {
              flexDirection: "row",
              justifyContent: "flex-end",
              height: 20,
            },
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#353535",
    flexDirection: "row",
    justifyContent: "space-between",
    width: width,
  },
});
export default ChooseLocation;
