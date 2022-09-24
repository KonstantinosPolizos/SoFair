import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  Modal,
  Switch,
  TextInput,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { isDriver, data1 } from "./LoginScreen1";
import { ref, onValue, update, get } from "firebase/database";
import { db } from "../components/config";
import { CalculateDistance } from "./CalculateDistance";
import * as ImagePicker from "expo-image-picker";

export let sameTownData = [];
export let isDriver1 = false;

const { width, height } = Dimensions.get("window");

const MyProfile = () => {
  const navigator = useNavigation();
  const sheetRef = useRef();
  const nameButtonRef = useRef();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [profImg, setProfImg] = useState(data1.imageURL);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [carPhoto, setCarPhoto] = useState(data1.carPhoto);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [carName, setCarName] = useState(data1.carName);
  const [btnClicked, setBtnclicked] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [userEmail, setUserEmail] = useState(data1.email);
  const [modalVisible5, setModalVisible5] = useState(false);
  const [carId, setCarId] = useState(data1.carId);
  const [regColor, setRegColor] = useState("#f48a85");
  const [logColor, setLogColor] = useState("#263f3f");

  const pickImageFun = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setProfImg(result.uri);
    }
  };

  const pickCarPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setCarPhoto(result.uri);
    }
  };

  useEffect(() => {
    const starCountRef1 = ref(db, "usersInfos/" + data1.userName);
    onValue(starCountRef1, (snapshot) => {
      const data = snapshot.val();

      isDriver1 = data.isDriver;

      if (data.isActive) {
        const starCountRef = ref(db, "usersLocation/");
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          const driverData = data[data1.userName];

          sameTownData = [];

          Object.keys(data).map((name) => {
            get(ref(db, "usersInfos/" + name)).then((snapshot) => {
              if (!snapshot.val()["isDriver"]) {
                if (
                  data[name].startLocation.town ===
                  driverData.startLocation.town
                ) {
                  if (
                    data[name].endLocation.town === driverData.endLocation.town
                  ) {
                    const coord1 = {
                      latitude: data[name].endLocation.latitude,
                      longitude: data[name].endLocation.longitude,
                    };
                    const coord2 = {
                      latitude: driverData.endLocation.latitude,
                      longitude: driverData.endLocation.longitude,
                    };
                    let d = CalculateDistance({ coord1, coord2 });
                    if (Math.floor(d) < 1000) {
                      if (sameTownData.length === 0) {
                        sameTownData.push({
                          name: name,
                          locations: data[name],
                        });
                      } else {
                        sameTownData.map((dato) => {
                          if (
                            dato.locations.startLocation.latitude !==
                            data[name].startLocation.latitude
                          ) {
                            if (
                              dato.locations.startLocation.longitude !==
                              data[name].startLocation.longitude
                            ) {
                              sameTownData.push({
                                name: name,
                                locations: data[name],
                              });
                            }
                          }
                        });
                      }
                    }
                  }
                }
              }
            });
          });
        });
      } else {
        sameTownData = [];
      }
    });
  }, [isEnabled]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <RBSheet
          ref={sheetRef}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              backgroundColor: "#353535",
            },
            wrapper: {
              backgroundColor: "rgba(35, 35, 35, 0.8)",
            },
            draggableIcon: {
              backgroundColor: "#f48a85",
            },
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              backgroundColor: "#353535",
            }}
          >
            <Text style={{ color: "white" }}>Change Account</Text>
          </View>

          <View
            style={{
              alignSelf: "center",
              width: width - 60,
              marginVertical: 12,
              borderBottomColor: "grey",
              borderBottomWidth: StyleSheet.hairlineWidth,
              backgroundColor: "#353535",
            }}
          />

          <ScrollView
            style={{ marginTop: 10, backgroundColor: "#353535" }}
            key={Date.now() + "kos"}
          >
            <TouchableOpacity
              key={Date.now() + "touch1"}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 30,
              }}
              onPress={() => {
                sheetRef.current.close();
              }}
            >
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Image
                  key={Date.now() + "a"}
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    borderRadius: 4,
                  }}
                  source={{ uri: data1.imageURL }}
                />
                <View>
                  <Text
                    style={{ fontSize: 15, color: "white" }}
                    key={Date.now() + "b"}
                  >
                    {data1.userName}
                  </Text>
                </View>
              </View>
              <AntDesign name="checkcircle" size={20} color="#f48a85" />
            </TouchableOpacity>
            <TouchableOpacity
              key={Date.now() + "touch2"}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20,
                marginHorizontal: 30,
              }}
              onPress={() => {
                navigator.navigate("LoginScreen1");
                sheetRef.current.close();
              }}
            >
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <MaterialIcons
                  name="add-circle"
                  size={30}
                  color="#f48a85"
                  style={{
                    marginRight: 10,
                  }}
                />
                <View>
                  <Text style={{ fontSize: 15, color: "white" }}>
                    Login With Other Account
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </RBSheet>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible1}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "grey",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                //fontWeight: "bold",
                fontSize: 13,
                color: "#353535",
              }}
            >
              Do you want to change profile image?
            </Text>

            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
              onPress={pickImageFun}
            >
              <Image
                key={Date.now() + "pl"}
                source={{ uri: profImg }}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 10,
                  backgroundColor: "white",
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                width: width - 80,
                height: 50,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={[
                  {
                    borderRadius: 5,
                    width: 140,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  { backgroundColor: regColor },
                ]}
                onPress={() => {
                  let tmp = regColor;
                  if (regColor !== "#95a2f1") {
                    setRegColor(logColor);
                    setLogColor(tmp);
                  }

                  update(ref(db, "usersInfos/" + data1.userName), {
                    imageURL: profImg,
                  });

                  setModalVisible1(!modalVisible1);
                }}
              >
                <Text
                  style={{
                    fontSize: 15, //fontWeight: "bold"
                  }}
                >
                  Change
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  {
                    borderRadius: 5,
                    width: 140,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  { backgroundColor: "#263f3f" },
                ]}
                onPress={() => {
                  setModalVisible1(!modalVisible1);
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    //fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalVisible2}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "grey",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                //fontWeight: "bold",
                fontSize: 13,
                color: "#353535",
              }}
            >
              Do you want to change car image?
            </Text>

            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
              onPress={pickCarPhoto}
            >
              <Image
                key={Date.now() + "pl"}
                source={{ uri: carPhoto }}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 10,
                  backgroundColor: "white",
                }}
              />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                width: width - 80,
                height: 50,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={[
                  {
                    borderRadius: 5,
                    width: 140,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  { backgroundColor: regColor },
                ]}
                onPress={() => {
                  let tmp = regColor;
                  if (regColor !== "#95a2f1") {
                    setRegColor(logColor);
                    setLogColor(tmp);
                  }

                  update(ref(db, "usersInfos/" + data1.userName), {
                    carPhoto: carPhoto,
                  });

                  setModalVisible2(!modalVisible2);
                }}
              >
                <Text
                  style={{
                    fontSize: 15, //fontWeight: "bold"
                  }}
                >
                  Change
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  {
                    borderRadius: 5,
                    width: 140,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  { backgroundColor: "#263f3f" },
                ]}
                onPress={() => {
                  setModalVisible2(!modalVisible2);
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    //fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalVisible3}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "grey",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                //fontWeight: "bold",
                fontSize: 13,
                color: "#353535",
              }}
            >
              Do you want to change car name?
            </Text>

            <TextInput
              style={{
                marginVertical: 20,
                borderRadius: 6,
                height: 50,
                width: width - 80,
                color: "black",
                paddingHorizontal: 20,
                backgroundColor: "#263f3f",
                color: "white",
              }}
              placeholder={data1.carName}
              placeholderTextColor={"grey"}
              onChangeText={(e) => {
                setCarName(e);
              }}
              ref={(e) => {
                if (e && btnClicked) {
                  e.clear();
                  setBtnclicked(false);
                }
              }}
            />

            <View
              style={{
                flexDirection: "row",
                width: width - 80,
                height: 50,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={[
                  {
                    borderRadius: 5,
                    width: 140,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  { backgroundColor: regColor },
                ]}
                onPress={() => {
                  let tmp = regColor;
                  if (regColor !== "#95a2f1") {
                    setRegColor(logColor);
                    setLogColor(tmp);
                  }

                  update(ref(db, "usersInfos/" + data1.userName), {
                    carName: carName,
                  });
                  setBtnclicked(true);
                  setModalVisible3(!modalVisible3);
                }}
              >
                <Text
                  style={{
                    fontSize: 15, //fontWeight: "bold"
                  }}
                >
                  Change
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  {
                    borderRadius: 5,
                    width: 140,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  { backgroundColor: "#263f3f" },
                ]}
                onPress={() => {
                  setModalVisible3(!modalVisible3);
                  setBtnclicked(true);
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    //fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalVisible4}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "grey",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                //fontWeight: "bold",
                fontSize: 13,
                color: "#353535",
              }}
            >
              Do you want to change email?
            </Text>

            <TextInput
              style={{
                marginVertical: 20,
                borderRadius: 6,
                height: 50,
                width: width - 80,
                color: "black",
                paddingHorizontal: 20,
                backgroundColor: "#263f3f",
                color: "white",
              }}
              placeholder={data1.email}
              placeholderTextColor={"grey"}
              onChangeText={(e) => {
                setUserEmail(e);
              }}
              ref={(e) => {
                if (e && btnClicked) {
                  e.clear();
                  setBtnclicked(false);
                }
              }}
            />

            <View
              style={{
                flexDirection: "row",
                width: width - 80,
                height: 50,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={[
                  {
                    borderRadius: 5,
                    width: 140,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  { backgroundColor: regColor },
                ]}
                onPress={() => {
                  let tmp = regColor;
                  if (regColor !== "#95a2f1") {
                    setRegColor(logColor);
                    setLogColor(tmp);
                  }

                  update(ref(db, "usersInfos/" + data1.userName), {
                    email: userEmail,
                  });
                  setBtnclicked(true);
                  setModalVisible4(!modalVisible4);
                }}
              >
                <Text
                  style={{
                    fontSize: 15, //fontWeight: "bold"
                  }}
                >
                  Change
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  {
                    borderRadius: 5,
                    width: 140,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  { backgroundColor: "#263f3f" },
                ]}
                onPress={() => {
                  setModalVisible4(!modalVisible4);
                  setBtnclicked(true);
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    //fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalVisible5}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "grey",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                //fontWeight: "bold",
                fontSize: 13,
                color: "#353535",
              }}
            >
              Do you want to change car ID?
            </Text>

            <TextInput
              style={{
                marginVertical: 20,
                borderRadius: 6,
                height: 50,
                width: width - 80,
                color: "black",
                paddingHorizontal: 20,
                backgroundColor: "#263f3f",
                color: "white",
              }}
              placeholder={data1.carId}
              placeholderTextColor={"grey"}
              onChangeText={(e) => {
                setCarId(e);
              }}
              ref={(e) => {
                if (e && btnClicked) {
                  e.clear();
                  setBtnclicked(false);
                }
              }}
            />

            <View
              style={{
                flexDirection: "row",
                width: width - 80,
                height: 50,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={[
                  {
                    borderRadius: 5,
                    width: 140,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  { backgroundColor: regColor },
                ]}
                onPress={() => {
                  let tmp = regColor;
                  if (regColor !== "#95a2f1") {
                    setRegColor(logColor);
                    setLogColor(tmp);
                  }

                  update(ref(db, "usersInfos/" + data1.userName), {
                    carId: carId,
                  });
                  setBtnclicked(true);
                  setModalVisible5(!modalVisible5);
                }}
              >
                <Text
                  style={{
                    fontSize: 15, //fontWeight: "bold"
                  }}
                >
                  Change
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  {
                    borderRadius: 5,
                    width: 140,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  { backgroundColor: "#263f3f" },
                ]}
                onPress={() => {
                  setModalVisible5(!modalVisible5);
                  setBtnclicked(true);
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    //fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={{
          justifyContent: "center",
          alignItems: "flex-end",
          width: width,
        }}
      >
        <TouchableOpacity
          key={Date.now() + "touch3"}
          style={{ width: 50 }}
          ref={nameButtonRef}
          onPress={() => {
            sheetRef.current.open();
          }}
        >
          <AntDesign
            name="logout"
            size={20}
            color="white"
            style={{ marginRight: 15, marginTop: 20 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: height / 5,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              setProfImg(data1.imageURL);
              setModalVisible1(true);
            }}
          >
            <Image
              key={Date.now() + "c"}
              source={{ uri: data1.imageURL }}
              style={{
                height: 100,
                width: 90,
                borderRadius: 20,
                backgroundColor: "white",
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              width: width / 1.3,
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            {isDriver ? (
              <View
                style={{ justifyContent: "center", alignItems: "center" }}
                key={Date.now() + "driverView1"}
              >
                <Text style={{ fontSize: 17, color: "grey" }}>Rate</Text>
                <Text
                  style={{ fontSize: 18, color: "white" }}
                  key={Date.now() + "d"}
                >
                  {data1.rate}
                </Text>
              </View>
            ) : (
              <View
                style={{ justifyContent: "center", alignItems: "center" }}
                key={Date.now() + "customerView1"}
              >
                <Text style={{ fontSize: 17, color: "grey" }}>Trips</Text>
                <Text
                  style={{ fontSize: 18, color: "white" }}
                  key={Date.now() + "e"}
                >
                  {data1.trips}
                </Text>
              </View>
            )}

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 17, color: "grey" }}>Name</Text>
              <Text
                style={{ fontSize: 18, color: "white" }}
                key={Date.now() + "f"}
              >
                {data1.userName}
              </Text>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: -15,
              }}
            >
              <Text style={{ fontSize: 17, color: "grey" }}>Active</Text>
              {data1.isDriver ? (
                <Switch
                  style={{ marginTop: -10 }}
                  trackColor={{ false: "grey", true: "grey" }}
                  thumbColor={isEnabled ? "#f48a85" : "#263f3f"}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  onChange={() => {
                    if (!isEnabled) {
                      update(ref(db, "usersInfos/" + data1.userName), {
                        isActive: true,
                      })
                        .then(() => {
                          //hello
                        })
                        .catch((error) => {
                          Alert.alert(error);
                        });
                    } else {
                      update(ref(db, "usersInfos/" + data1.userName), {
                        isActive: false,
                      })
                        .then(() => {
                          //hello
                        })
                        .catch((error) => {
                          Alert.alert(error);
                        });
                    }
                  }}
                />
              ) : (
                <View></View>
              )}
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        style={{
          alignSelf: "center",
          marginTop: 50,
          width: width / 1.2,
        }}
      >
        <View style={{ marginTop: 20 }}>
          <Text style={{ marginLeft: 15, fontSize: 16, color: "white" }}>
            E-mail
          </Text>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 8,
              borderRadius: 7,
              borderColor: "grey",
              borderWidth: 1,
              height: 45,
            }}
            onPress={() => {
              setModalVisible4(true);
            }}
          >
            <Text
              style={{ marginLeft: 30, fontSize: 15, color: "#f48a85" }}
              key={Date.now() + "g"}
            >
              {data1.email}
            </Text>
          </TouchableOpacity>
        </View>

        {data1.isDriver ? (
          <View key={Date.now() + "driverView2"}>
            <View style={{ marginTop: 20 }}>
              <Text style={{ marginLeft: 15, fontSize: 16, color: "white" }}>
                Car name
              </Text>

              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 8,
                  borderRadius: 7,
                  borderColor: "grey",
                  borderWidth: 1,
                  height: 45,
                }}
                onPress={() => {
                  setModalVisible3(true);
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "#f48a85" }}
                  key={Date.now() + "h"}
                >
                  {data1.carName}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={{ marginLeft: 15, fontSize: 16, color: "white" }}>
                Car id
              </Text>

              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 8,
                  borderRadius: 7,
                  borderColor: "grey",
                  borderWidth: 1,
                  height: 45,
                }}
                onPress={() => {
                  setModalVisible5(true);
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "#f48a85" }}
                  key={Date.now() + "i"}
                >
                  {data1.carId}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={{ marginLeft: 15, fontSize: 16, color: "white" }}>
                Car photo
              </Text>
              <TouchableOpacity
                key={Date.now() + "touch4"}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 20,
                  width: width / 1.2,
                }}
                onPress={() => {
                  setModalVisible2(true);
                }}
              >
                <Image
                  key={Date.now() + "j"}
                  source={{ uri: data1.carPhoto }}
                  style={{
                    height: 150,
                    width: width / 1.22,
                    borderRadius: 20,
                    backgroundColor: "white",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View key={Date.now() + "customerView2"}></View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#353535",
    marginTop: StatusBar.currentHeight,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 5,
  },
});
