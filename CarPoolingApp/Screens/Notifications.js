import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  ScrollView,
  Modal,
  StatusBar,
  Touchable,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { isDriver, data1 } from "./LoginScreen1";
import { ref, onValue, update, get } from "firebase/database";
import { db } from "../components/config";
import Slider from "@react-native-community/slider";

const { width, height } = Dimensions.get("window");

const Notifications = () => {
  const sheetRef = useRef();
  const [regColor, setRegColor] = useState("#f48a85");
  const [logColor, setLogColor] = useState("#263f3f");
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [clickedType, setClickedType] = useState("");
  const [notificationContent, setNotificationContent] = useState("");
  const [declinedName, setDeclinedName] = useState("");
  const [driversData, setDriversData] = useState({});

  useEffect(() => {
    const startcountRef = ref(db, "notifications/" + data1.userName);
    onValue(startcountRef, (snapshot) => {
      const data = snapshot.val();
      setNotifications(JSON.parse(data.notifications));
    });
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 30,
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              color: "#D3D3D3",
              marginLeft: 5,
            }}
          >
            Notifications
          </Text>
        </View>
      </View>

      <View
        style={{
          alignSelf: "center",
          width: width - 45,
          marginVertical: 10,
          marginRight: 10,
          borderBottomColor: "grey",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />

      <View style={styles.title}>
        <RBSheet
          ref={sheetRef}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              backgroundColor: "#353535",
              height: height - 50,
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
              height: height / 5,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={{ uri: driversData.imageURL }}
                  style={{
                    height: 90,
                    width: 90,
                    borderRadius: 20,
                    backgroundColor: "white",
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: width / 1.3,
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                {driversData.isDriver ? (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={{ fontSize: 17, color: "grey" }}>Rate</Text>
                    <Text style={{ fontSize: 18, color: "white" }}>
                      {driversData.rate}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={{ fontSize: 17, color: "grey" }}>Trips</Text>
                    <Text style={{ fontSize: 18, color: "white" }}>
                      {driversData.trips}
                    </Text>
                  </View>
                )}

                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ fontSize: 17, color: "grey" }}>Name</Text>
                  <Text style={{ fontSize: 18, color: "white" }}>
                    {driversData.userName}
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
                </View>
              </View>
            </View>
          </View>

          <ScrollView
            style={{
              alignSelf: "center",
              marginTop: 10,
              width: width / 1.2,
            }}
          >
            <View style={{ marginTop: 20 }}>
              <Text style={{ marginLeft: 15, fontSize: 16, color: "white" }}>
                E-mail
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 8,
                  borderRadius: 7,
                  borderColor: "grey",
                  borderWidth: 1,
                  height: 45,
                }}
              >
                <Text
                  style={{ marginLeft: 30, fontSize: 15, color: "#f48a85" }}
                >
                  {driversData.email}
                </Text>
              </View>
            </View>

            {driversData.isDriver ? (
              <View>
                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{ marginLeft: 15, fontSize: 16, color: "white" }}
                  >
                    Car name
                  </Text>

                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 8,
                      borderRadius: 7,
                      borderColor: "grey",
                      borderWidth: 1,
                      height: 45,
                    }}
                  >
                    <Text style={{ fontSize: 15, color: "#f48a85" }}>
                      {driversData.carName}
                    </Text>
                  </View>
                </View>

                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{ marginLeft: 15, fontSize: 16, color: "white" }}
                  >
                    Car id
                  </Text>

                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 8,
                      borderRadius: 7,
                      borderColor: "grey",
                      borderWidth: 1,
                      height: 45,
                    }}
                  >
                    <Text style={{ fontSize: 15, color: "#f48a85" }}>
                      {driversData.carId}
                    </Text>
                  </View>
                </View>

                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{ marginLeft: 15, fontSize: 16, color: "white" }}
                  >
                    Car photo
                  </Text>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 20,
                      width: width / 1.2,
                    }}
                  >
                    <Image
                      source={{ uri: driversData.carPhoto }}
                      style={{
                        height: 150,
                        width: width / 1.22,
                        borderRadius: 20,
                        backgroundColor: "white",
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View key={Date.now() + "customerView2"}></View>
            )}
          </ScrollView>
        </RBSheet>
      </View>

      <ScrollView>
        {notifications.map((object) => {
          return (
            <View key={Date.now() + Math.random()}>
              <Modal
                key={Date.now() + "Modal 1"}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 22,
                    width: width,
                    height: height / 2,
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
                    {notificationContent.includes("wants to be your driver") ? (
                      <TouchableOpacity
                        style={[
                          {
                            width: 300,
                            height: 48,
                            justifyContent: "center",
                            alignItems: "center",
                          },
                        ]}
                        onPress={() => {
                          get(
                            ref(
                              db,
                              "usersInfos/" + notificationContent.split(" ")[0]
                            )
                          ).then((snapshot) => {
                            setDriversData(snapshot.val());
                            sheetRef.current.open();
                          });
                        }}
                      >
                        <Text
                          style={{
                            //fontWeight: "bold",
                            fontSize: 15,
                            color: "blue",
                          }}
                        >
                          {notificationContent}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <Text
                        style={{
                          //fontWeight: "bold",

                          fontSize: 15,
                          color: "#353535",
                        }}
                      >
                        {notificationContent}
                      </Text>
                    )}

                    {clickedType === "rate" ? (
                      <Slider
                        style={{ width: 200, height: 60 }}
                        minimumValue={0}
                        maximumValue={5}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        onSlidingComplete={(e) => {
                          let driversName = data1.driversName;

                          get(ref(db, "usersInfos/" + driversName)).then(
                            (snapshot) => {
                              update(ref(db, "usersInfos/" + driversName), {
                                rate: Math.round(
                                  (parseInt(snapshot.val().rate) + e) / 2
                                ).toString(),
                              })
                                .then(() => {
                                  return;
                                })
                                .catch((error) => {
                                  Alert.alert(error);
                                });

                              update(ref(db, "usersInfos/" + driversName), {
                                passengersName: "",
                                driversName: "",
                              })
                                .then(() => {
                                  //
                                })
                                .catch((error) => {
                                  Alert.alert(error);
                                });
                            }
                          );

                          setModalVisible(false);
                        }}
                      />
                    ) : (
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
                              height: 48,
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

                            if (notifications[0].type === "request") {
                              if (data1.isDriver === false) {
                                update(
                                  ref(db, "usersInfos/" + data1.userName),
                                  {
                                    driversName:
                                      notifications[0].notification.split(
                                        " "
                                      )[0],
                                  }
                                )
                                  .then(() => {
                                    return;
                                  })
                                  .catch((error) => {
                                    Alert.alert(error);
                                  });

                                get(
                                  ref(
                                    db,
                                    "notifications/" +
                                      notifications[0].notification.split(
                                        " "
                                      )[0]
                                  )
                                ).then((snapshot) => {
                                  let data = JSON.parse(
                                    snapshot.val().notifications
                                  );

                                  if (
                                    JSON.parse(snapshot.val().notifications)[0]
                                      .notification !==
                                    data1.userName + "  accepted your request!"
                                  ) {
                                    data.splice(0, 0, {
                                      name: notifications[0].notification.split(
                                        " "
                                      )[0],
                                      type: "request",
                                      notification:
                                        data1.userName +
                                        "  accepted your request!",
                                      disable: false,
                                    });

                                    update(
                                      ref(
                                        db,
                                        "usersInfos/" +
                                          notifications[0].notification.split(
                                            " "
                                          )[0]
                                      ),
                                      {
                                        isDeclined: false,
                                      }
                                    );

                                    update(
                                      ref(
                                        db,
                                        "notifications/" +
                                          notifications[0].notification.split(
                                            " "
                                          )[0]
                                      ),
                                      {
                                        notifications: JSON.stringify(data),
                                      }
                                    );
                                  }
                                });
                              } else {
                                update(
                                  ref(db, "usersInfos/" + data1.userName),
                                  {
                                    passengersName:
                                      notifications[0].notification.split(
                                        " "
                                      )[0],
                                  }
                                )
                                  .then(() => {
                                    return;
                                  })
                                  .catch((error) => {
                                    Alert.alert(error);
                                  });
                              }
                            }

                            setModalVisible(!modalVisible);
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15, //fontWeight: "bold"
                            }}
                          >
                            Ok
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            {
                              borderRadius: 5,
                              width: 140,
                              height: 48,
                              justifyContent: "center",
                              alignItems: "center",
                            },
                            { backgroundColor: "#263f3f" },
                          ]}
                          onPress={() => {
                            if (notifications[0].type === "request") {
                              if (data1.isDriver === false) {
                                setDeclinedName(data1.driversName);

                                update(
                                  ref(db, "usersInfos/" + data1.userName),
                                  {
                                    driversName: "",
                                  }
                                )
                                  .then(() => {
                                    return;
                                  })
                                  .catch((error) => {
                                    Alert.alert(error);
                                  });

                                get(
                                  ref(
                                    db,
                                    "notifications/" +
                                      notifications[0].notification.split(
                                        " "
                                      )[0]
                                  )
                                ).then((snapshot) => {
                                  let data = JSON.parse(
                                    snapshot.val().notifications
                                  );

                                  if (
                                    JSON.parse(snapshot.val().notifications)[0]
                                      .notification !==
                                    data1.userName + " declined your request!"
                                  ) {
                                    data.splice(0, 0, {
                                      name: notifications[0].notification.split(
                                        " "
                                      )[0],
                                      type: "welcome",
                                      notification:
                                        data1.userName +
                                        "  declined your request!",
                                      disable: false,
                                    });

                                    update(
                                      ref(
                                        db,
                                        "usersInfos/" +
                                          notifications[0].notification.split(
                                            " "
                                          )[0]
                                      ),
                                      {
                                        isDeclined: true,
                                      }
                                    );

                                    update(
                                      ref(
                                        db,
                                        "notifications/" +
                                          notifications[0].notification.split(
                                            " "
                                          )[0]
                                      ),
                                      {
                                        notifications: JSON.stringify(data),
                                      }
                                    );
                                  }
                                });
                              }
                            }
                            setModalVisible(!modalVisible);
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
                    )}
                  </View>
                </View>
              </Modal>

              <TouchableOpacity
                //disabled={true}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 8,
                  borderRadius: 7,
                  borderColor: "grey",
                  borderWidth: 1,
                  width: width / 1.07,
                  height: 45,
                  marginLeft: 10,
                }}
                onPress={() => {
                  if (object.type === "welcome") {
                    setNotificationContent(
                      object.notification + " " + object.name
                    );
                  } else {
                    setNotificationContent(object.notification);
                  }

                  if (object.type !== "welcome") setModalVisible(true);
                  setClickedType(object.type);
                }}
              >
                <Text
                  style={{
                    //fontWeight: "bold",
                    fontSize: 15,
                    color: "#f48a85",
                    width: width / 1.2,
                  }}
                >
                  {object.notification}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: 10,
                  marginTop: 10,
                }}
              ></View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Notifications;

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
