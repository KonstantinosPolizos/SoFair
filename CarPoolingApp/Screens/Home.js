import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import { ref, remove, update, onValue, set, get } from "firebase/database";
import { db } from "../components/config";
import { data1, isDriver } from "./LoginScreen1";
import { sameTownData, isDriver1 } from "./MyProfile";
import { CalculateDistance } from "./CalculateDistance";

const GOOGLE_MAPS_APIKEY = "AIzaSyC0Dyzm19O_8w3tnmmymll2QUSnttZLVv4";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
let LATITUDE_DELTA = 0.0422;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const customMap = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#263c3f",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#38414e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#212a37",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9ca5b3",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f3d19c",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#2f3948",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#515c6d",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
];

Geocoder.init(GOOGLE_MAPS_APIKEY);

const Home = ({ navigation }) => {
  const mapRef = useRef();

  const [reachOnce, setReachOnce] = useState(true);
  const [destReachOnce, setDestReachOnce] = useState(true);
  const [sameTownData1, setSameTownData1] = useState(sameTownData);

  const [curLoc, setCurloc] = useState({
    latitude: 38.8997,
    longitude: 22.4337,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [droplocationCords, setDroplocationCords] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [endlocationCords, setEndlocationCords] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [roadCoords, setRoadCoords] = useState([]);
  const [newRoadCoords, setNewRoadCoords] = useState([]);
  const [finalCoordArray, setFinalCoordArray] = useState([]);
  const [minDistance, setMinDistance] = useState({
    index: -1,
    distance: 100000,
  });

  const getLiveLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync();

    /*console.log(
      data1.userName,
      location.coords.latitude,
      location.coords.longitude,
      sameTownData
    );*/

    if (
      parseFloat(location.coords.latitude.toFixed(5)) !== curLoc.latitude &&
      parseFloat(location.coords.longitude.toFixed(5)) !== curLoc.longitude
    )
      setCurloc({
        latitude: parseFloat(location.coords.latitude.toFixed(5)),
        longitude: parseFloat(location.coords.longitude.toFixed(5)),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
  };

  //live update location
  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  });

  //get coordinates for end location
  useEffect(() => {
    if (typeof navigation.getState().routes[0].params === "undefined") return;

    const destination = navigation.getState().routes[0].params.destinationCords;
    setDroplocationCords({
      latitude: destination.latitude,
      longitude: destination.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });

    setEndlocationCords({
      latitude: destination.latitude,
      longitude: destination.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });

    setDestReachOnce(true);
  }, [navigation.getState()]);

  //remove users route
  useEffect(() => {
    let coord1 = (coord1 = {
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
    });

    let coord2 = {};
    if (data1.isDriver)
      coord2 = {
        latitude: endlocationCords.latitude,
        longitude: endlocationCords.longitude,
      };
    else
      coord2 = {
        latitude: droplocationCords.latitude,
        longitude: droplocationCords.longitude,
      };

    let d = CalculateDistance({ coord1, coord2 });
    if (Math.floor(d) < 50) {
      setDroplocationCords({
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });

      update(ref(db, "usersLocation/" + data1.userName), {
        endLocation: droplocationCords,
      })
        .then(() => {
          //
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  }, [curLoc]);

  //reach destination
  useEffect(() => {
    let coord1 = {};
    let coord2 = {};
    sameTownData1.map((value) => {
      if (value.name === data1.passengersName) {
        coord2 = {
          latitude: value.locations.endLocation.latitude,
          longitude: value.locations.endLocation.longitude,
        };
      }
    });

    coord1 = {
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
    };

    let d = CalculateDistance({ coord1, coord2 });
    //console.log(Math.floor(d));

    if (data1.isDriver && Math.floor(d) < 50 && data1.passengersName !== "") {
      const passengersName = data1.passengersName;
      //rate
      get(ref(db, "notifications/" + passengersName)).then((snapshot) => {
        let tmpNotificationArray = Object.values(
          JSON.parse(snapshot.val()["notifications"])
        );

        tmpNotificationArray.reverse();

        tmpNotificationArray.push({
          name: passengersName,
          notification: "Help us with our rate!",
          type: "rate",
          disable: false,
        });

        tmpNotificationArray.reverse();

        update(ref(db, "notifications/" + passengersName), {
          notifications: JSON.stringify(tmpNotificationArray),
        })
          .then(() => {
            //
          })
          .catch((error) => {
            Alert.alert(error);
          });
      });

      get(ref(db, "usersInfos/" + passengersName)).then((snap) => {
        update(ref(db, "usersInfos/" + passengersName), {
          trips: (parseInt(snap.val().trips) + 1).toString(),
        })
          .then(() => {
            //
          })
          .catch((error) => {
            Alert.alert(error);
          });
      });

      update(ref(db, "usersInfos/" + data1.userName), {
        passengersName: "",
        driversName: "",
      })
        .then(() => {
          //
        })
        .catch((error) => {
          Alert.alert(error);
        });

      let tmpValList = sameTownData;
      sameTownData1.map((value, key) => {
        if (value.name === passengersName) {
          delete tmpValList[key];
        }
      });

      setSameTownData1(tmpValList);
      setDroplocationCords(endlocationCords);
    }
  }, [curLoc]);

  //set final coord array with minimum dots in mapviewdirection
  useEffect(() => {
    if (roadCoords.length !== 0) {
      setNewRoadCoords([
        roadCoords[parseInt(roadCoords.length / 2 - 5, 10)],
        roadCoords[parseInt(roadCoords.length / 2, 10)],
        roadCoords[
          parseInt(roadCoords.length / 2 + roadCoords.length / 2 / 2, 10)
        ],
      ]);

      let tmpArrayCoord = [
        roadCoords[0],
        roadCoords[parseInt(roadCoords.length / 2 - 11, 10)],
        roadCoords[parseInt(roadCoords.length / 2, 10)],
        roadCoords[
          parseInt(roadCoords.length / 2 + roadCoords.length / 2 / 2, 10)
        ],
        roadCoords[roadCoords.length - 1],
      ];
      setFinalCoordArray(tmpArrayCoord);
    }
  }, [roadCoords]);

  //update same town data
  useEffect(() => {
    if (!data1.isActive) setSameTownData1([]);
    else setSameTownData1(sameTownData);

    //dont let two drivers go on the same passenger
    if (sameTownData1.length !== 0) {
      sameTownData.map((elem, key) => {
        get(ref(db, "usersInfos/" + elem.name)).then((snapshot) => {
          if (snapshot.val()["driversName"] !== "")
            if (snapshot.val()["driversName"] !== data1.userName) {
              let tmpList = sameTownData;
              delete tmpList[key];
              setSameTownData1(tmpList);
            }
        });
      });
    }

    //console.log(sameTownData);
  }, [sameTownData]);

  //confirmation check
  useEffect(() => {
    if (data1.isDriver && data1.passengersName !== "" && reachOnce) {
      get(ref(db, "usersLocation/" + data1.passengersName)).then((snapshot) => {
        let coord1 = {
          latitude: curLoc.latitude,
          longitude: curLoc.longitude,
        };
        let coord2 = {
          latitude: snapshot.val()["startLocation"].latitude,
          longitude: snapshot.val()["startLocation"].longitude,
        };
        let d = CalculateDistance({ coord1, coord2 });

        if (Math.floor(d) < 150) {
          //confirmation check
          get(ref(db, "notifications/" + data1.passengersName)).then(
            (snapshot) => {
              //console.log(snapshot.val());
              let tmpNotificationArray = Object.values(
                JSON.parse(snapshot.val()["notifications"])
              );

              tmpNotificationArray.reverse();

              tmpNotificationArray.push({
                name: data1.passengersName,
                notification: "Confirmation Check",
                type: "confirm",
                disable: false,
              });

              tmpNotificationArray.reverse();

              update(ref(db, "notifications/" + data1.passengersName), {
                notifications: JSON.stringify(tmpNotificationArray),
              })
                .then(() => {
                  //
                })
                .catch((error) => {
                  Alert.alert(error);
                });
            }
          );

          get(ref(db, "notifications/" + data1.userName)).then((snapshot) => {
            //console.log(snapshot.val());
            let tmpNotificationArray = Object.values(
              JSON.parse(snapshot.val()["notifications"])
            );

            tmpNotificationArray.reverse();

            tmpNotificationArray.push({
              name: data1.userName,
              notification: "Confirmation Check",
              type: "confirm",
              disable: false,
            });

            tmpNotificationArray.reverse();

            update(ref(db, "notifications/" + data1.userName), {
              notifications: JSON.stringify(tmpNotificationArray),
            })
              .then(() => {
                //
              })
              .catch((error) => {
                Alert.alert(error);
              });
          });

          setReachOnce(false);
        }
      });
    }
  }, [curLoc]);

  useEffect(() => {
    if (data1.isDeclined) {
      setDroplocationCords(endlocationCords);

      update(ref(db, "usersInfos/" + data1.userName), {
        isDeclined: false,
      });
    }
  }, [curLoc]);

  return (
    <View style={styles.container} key={Date.now() + "a0"}>
      <View
        style={{ flex: 1, flexDirection: "column" }}
        key={Date.now() + "a1"}
      >
        <TouchableOpacity
          key={Date.now() + "a2"}
          style={{
            backgroundColor: "#263f3f",
            width: width / 1.2,
            alignSelf: "center",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6,
            marginVertical: 10,
          }}
          onPress={() => {
            navigation.navigate("Destination");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: width / 2,
            }}
            key={Date.now() + "a3"}
          >
            <FontAwesome
              name="search"
              size={17}
              color="grey"
              style={{ marginBottom: 3, marginRight: 5 }}
              key={Date.now() + "a4"}
            />
            <Text
              style={{ color: "grey", marginBottom: 3, fontSize: 17 }}
              key={Date.now() + "a5"}
            >
              Enter Destination Here
            </Text>
          </View>
        </TouchableOpacity>

        <MapView
          customMapStyle={customMap}
          key={Date.now() + "a6"}
          ref={mapRef}
          style={{
            width: width,
            height: height,
            backgroundColor: "#353535",
          }}
          showsUserLocation
          followsUserLocation
          initialRegion={curLoc}
          onRegionChangeComplete={(region) => {
            LATITUDE_DELTA = region.latitudeDelta;
            LONGITUDE_DELTA = region.longitudeDelta;
          }}
        >
          {minDistance.distance !== 100000 &&
          minDistance !== 1 &&
          sameTownData.length !== 0 ? (
            <Marker
              key={Date.now() + "b" + 1}
              coordinate={finalCoordArray[minDistance.index]}
            >
              <Entypo name="dot-single" size={50} color="white" />
            </Marker>
          ) : (
            <View key={Date.now() + "a6"}></View>
          )}
          <Marker
            coordinate={
              typeof droplocationCords !== "undefined"
                ? droplocationCords
                : {
                    latitude: 0.0,
                    longitude: 0.0,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }
            }
            key={Date.now() + "a7"}
          >
            <AntDesign name="downcircle" size={24} color="#007aff" />
          </Marker>
          <MapViewDirections
            key={Date.now() + "a8"}
            origin={curLoc}
            destination={droplocationCords}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor={droplocationCords.latitude == 0 ? "#353535" : "yellow"}
            onReady={(results) => {
              //setRoadCoords(results.coordinates);
              if (roadCoords.length === 0) {
                setRoadCoords(results.coordinates);
              } else if (
                roadCoords[0].latitude !== results.coordinates[0].latitude &&
                roadCoords[0].longitude !== results.coordinates[0].longitude
              ) {
                setRoadCoords(results.coordinates);
              } else if (
                roadCoords[roadCoords.length - 1].latitude !==
                  results.coordinates[results.coordinates.length - 1]
                    .latitude &&
                roadCoords[roadCoords.length - 1].longitude !==
                  results.coordinates[results.coordinates.length - 1].longitude
              ) {
                setRoadCoords(results.coordinates);
              }
            }}
            //onStart={(res) => {console.log(res)}}
          />

          {sameTownData1.map((elem, index) => {
            //console.log(elem.locations);
            return (
              <View key={Date.now() + "c" + index}>
                <Marker
                  key={Date.now() + "d" + index}
                  coordinate={
                    typeof elem.locations.startLocation !== "undefined"
                      ? elem.locations.startLocation
                      : {
                          latitude: 0.0,
                          longitude: 0.0,
                          latitudeDelta: LATITUDE_DELTA,
                          longitudeDelta: LONGITUDE_DELTA,
                        }
                  }
                  onPress={() => {
                    if (isDriver1) {
                      setDroplocationCords({
                        latitude: elem.locations.startLocation.latitude,
                        longitude: elem.locations.startLocation.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                      });
                    }
                    setReachOnce(true);

                    get(ref(db, "notifications/" + elem.name)).then(
                      (snapshot) => {
                        //console.log(snapshot.val());
                        let tmpNotificationArray = Object.values(
                          JSON.parse(snapshot.val()["notifications"])
                        );

                        tmpNotificationArray.reverse();

                        tmpNotificationArray.push({
                          name: elem.name,
                          notification:
                            data1.userName + " wants to be your driver!",
                          type: "request",
                          disable: false,
                        });

                        tmpNotificationArray.reverse();

                        update(ref(db, "notifications/" + elem.name), {
                          notifications: JSON.stringify(tmpNotificationArray),
                        })
                          .then(() => {
                            //
                          })
                          .catch((error) => {
                            Alert.alert(error);
                          });
                      }
                    );
                  }}
                >
                  <FontAwesome5 name="walking" size={24} color="yellow" />
                </Marker>

                {finalCoordArray.length !== 0 ? (
                  finalCoordArray.map((coord, index) => {
                    return (
                      <MapViewDirections
                        key={Date.now() + "e" + index}
                        origin={coord}
                        destination={elem.locations.startLocation}
                        apikey={GOOGLE_MAPS_APIKEY}
                        onReady={(res) => {
                          //console.log(res.coordinates.length, minDistance);

                          if (typeof res.coordinates !== "undefined") {
                            if (minDistance.distance > res.coordinates.length) {
                              //console.log(res.coordinates.length);
                              setMinDistance({
                                index: index,
                                distance: res.coordinates.length,
                              });
                            }
                          }
                        }}
                      />
                    );
                  })
                ) : (
                  <View></View>
                )}

                <Marker
                  key={Date.now() + "f" + index}
                  coordinate={
                    typeof elem.locations.endLocation !== "undefined"
                      ? elem.locations.endLocation
                      : {
                          latitude: 0.0,
                          longitude: 0.0,
                          latitudeDelta: LATITUDE_DELTA,
                          longitudeDelta: LONGITUDE_DELTA,
                        }
                  }
                >
                  <AntDesign name="downcircle" size={20} color="yellow" />
                </Marker>

                <MapViewDirections
                  key={Date.now() + "g" + index}
                  origin={elem.locations.startLocation}
                  destination={elem.locations.endLocation}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor={
                    droplocationCords.latitude == 0 ? "yellow" : "yellow"
                  }
                />
              </View>
            );
          })}
        </MapView>
      </View>

      <View
        style={{
          width: width,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 10,
            backgroundColor: "#f48a85",
            width: 110,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            Geocoder.from(curLoc.latitude, curLoc.longitude)
              .then((json) => {
                var addressComponent = json.results[0].address_components;
                let countryIDX = 0;
                let townIDX = 0;

                addressComponent.map((obj, idx) => {
                  if (obj.types[0] === "locality") townIDX = idx;
                  if (obj.types[0] === "country") countryIDX = idx;
                });

                update(ref(db, "usersLocation/" + data1.userName), {
                  startLocation: {
                    latitude: curLoc.latitude,
                    longitude: curLoc.longitude,
                    town: addressComponent[townIDX].long_name,
                    country: addressComponent[countryIDX].long_name,
                  },
                })
                  .then(() => {
                    //
                  })
                  .catch((error) => {
                    Alert.alert(error);
                  });
              })
              .catch((error) => console.warn(error));
          }}
        >
          <Text style={{ color: "#353535" }}>Publish Route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#353535",
  },
  searchContainer: {
    position: "absolute",
    top: 5,
    width: width - 50,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
  },
});
