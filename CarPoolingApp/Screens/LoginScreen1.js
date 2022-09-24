import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ref, onValue, update } from "firebase/database";
import { db } from "../components/config";

const { width, height } = Dimensions.get("window");

export let isDriver = false;
export let data1 = {};

const LoginScreen1 = () => {
  const navigator = useNavigation();
  const [regColor, setRegColor] = useState("#f48a85");
  const [logColor, setLogColor] = useState("#263f3f");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [btnClicked, setBtnclicked] = useState(false);

  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        alignItems: "center",
        flex: 1,
        backgroundColor: "#353535",
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          color: "white",
          marginTop: 50,
        }}
      >
        Welcome Back!
      </Text>

      <View
        style={{
          width: width - 40,
          height: 250,
          marginTop: 30,
          alignItems: "center",
        }}
      >
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
          placeholder="Username"
          placeholderTextColor={"grey"}
          onChangeText={(e) => {
            setUsername(e);
          }}
          ref={(e) => {
            if (e && btnClicked) {
              e.clear();
              setBtnclicked(false);
            }
          }}
        />
        <TextInput
          style={{
            borderRadius: 6,
            height: 50,
            width: width - 80,
            color: "black",
            backgroundColor: "#263f3f",
            paddingHorizontal: 20,
            color: "white",
          }}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={"grey"}
          value={password}
          onChangeText={(e) => {
            setPassword(e);
          }}
          ref={(e) => {
            if (e && btnClicked) {
              e.clear();
              setBtnclicked(false);
            }
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: -70,
        }}
      >
        <View
          style={{
            alignSelf: "center",
            width: 90,
            marginVertical: 15,
            borderBottomColor: "grey",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={{ marginHorizontal: 20, color: "white" }}>Log in as</Text>
        <View
          style={{
            alignSelf: "center",
            width: 90,
            marginVertical: 15,
            borderBottomColor: "grey",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: width - 80,
          height: 50,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
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

            isDriver = true;
            setBtnclicked(true);

            const starCountRef = ref(db, "usersInfos/" + userName);
            onValue(starCountRef, (snapshot) => {
              const data = snapshot.val();

              if (data === null) Alert.alert("Try to register first");
              else {
                if (data.userName === userName && data.password === password) {
                  data1 = data;
                  update(ref(db, "usersInfos/" + userName), {
                    isDriver: true,
                  })
                    .then(() => {})
                    .catch((error) => {
                      Alert.alert(error);
                    });

                  navigator.navigate("Main");
                } else {
                  Alert.alert("Use true credentials");
                }
              }
            });
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Driver</Text>
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
            { backgroundColor: logColor },
          ]}
          onPress={() => {
            let tmp = regColor;
            if (logColor !== "#95a2f1") {
              setRegColor(logColor);
              setLogColor(tmp);
            }
            isDriver = false;
            setBtnclicked(true);

            const starCountRef = ref(db, "usersInfos/" + userName);
            onValue(starCountRef, (snapshot) => {
              const data = snapshot.val();

              if (data === null) Alert.alert("Try to register first");
              else {
                if (data.userName === userName && data.password === password) {
                  data1 = data;
                  update(ref(db, "usersInfos/" + userName), {
                    isDriver: false,
                  })
                    .then(() => {
                      //hello
                    })
                    .catch((error) => {
                      Alert.alert(error);
                    });
                  navigator.navigate("Main");
                } else {
                  Alert.alert("Use true credentials");
                }
              }
            });
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Passenger</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: width / 1.32,
          marginTop: 30,
          justifyContent: "flex-end",
        }}
      >
        <Text style={{ color: "white" }}>Not a member yet?</Text>
        <TouchableOpacity
          onPress={() => {
            navigator.navigate("LoginScreen2");
          }}
        >
          <Text style={{ color: "#f48a85" }}> Register now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen1;

const styles = StyleSheet.create({});
