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
import { ref, set } from "firebase/database";
import { db } from "../components/config";

const { width, height } = Dimensions.get("window");

const LoginScreen1 = () => {
  const navigator = useNavigation();
  const [regColor, setRegColor] = useState("#f48a85");
  const [logColor, setLogColor] = useState("#263f3f");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const [btnClicked, setBtnclicked] = useState(false);

  const create = () => {
    set(ref(db, "usersInfos/" + userName), {
      userId: (userName.charAt(0) + Date.now()).toString(),
      userName: userName,
      password: password,
      email: email,
      trips: "0",
      rate: "1",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png",
      isDriver: false,
      isActive: false,
      isDeclined: false,
      driversName: "",
      passengersName: "",
      carId: "MIN " + Math.floor(1000 + Math.random() * 9000).toString(),
      carName: "Mercedes",
      carPhoto:
        "https://images.unsplash.com/photo-1583267746897-2cf415887172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXV0b21vYmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
    })
      .then(() => {
        //console.log(userName);
      })
      .catch((error) => {
        Alert.alert(error);
      });

    set(ref(db, "usersLocation/" + userName), {
      startLocation: {
        latitude: 38.8997,
        longitude: 22.4337,
        town: "lamia",
        country: "greece",
      },
      endLocation: {
        latitude: 38.8997,
        longitude: 22.4337,
        town: "lamia",
        country: "greece",
      },
    })
      .then(() => {
        //console.log(userName);
      })
      .catch((error) => {
        Alert.alert(error);
      });

    let tmpList = [
      {
        name: userName,
        type: "welcome",
        notification: "Welcome User",
        disable: false,
      },
    ];

    set(ref(db, "notifications/" + userName), {
      notifications: JSON.stringify(tmpList),
    })
      .then(() => {
        //hello
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

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
          marginTop: 30,
        }}
      >
        Registration!
      </Text>

      <View
        style={{
          width: width - 40,
          marginTop: 30,
          alignItems: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            width: width,
            marginRight: width / 1.75,
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
            Username
          </Text>
        </View>
        <TextInput
          style={{
            marginBottom: 20,
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
            setUserName(e);
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
            alignItems: "center",
            width: width,
            marginRight: width / 1.75,
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
            Password
          </Text>
        </View>
        <TextInput
          style={{
            marginBottom: 20,
            borderRadius: 6,
            height: 50,
            width: width - 80,
            color: "black",
            paddingHorizontal: 20,
            backgroundColor: "#263f3f",
            color: "white",
          }}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={"grey"}
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

        <View
          style={{
            alignItems: "center",
            width: width,
            marginRight: width / 2.4,
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
            Confirm Password
          </Text>
        </View>
        <TextInput
          style={{
            marginBottom: 20,
            borderRadius: 6,
            height: 50,
            width: width - 80,
            color: "black",
            paddingHorizontal: 20,
            backgroundColor: "#263f3f",
            color: "white",
          }}
          placeholder="Confirm Password"
          secureTextEntry
          placeholderTextColor={"grey"}
          onChangeText={(e) => {
            setConfirmPass(e);
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
            alignItems: "center",
            width: width,
            marginRight: width / 1.55,
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
            E-mail
          </Text>
        </View>
        <TextInput
          style={{
            marginBottom: 20,
            borderRadius: 6,
            height: 50,
            width: width - 80,
            color: "black",
            paddingHorizontal: 20,
            backgroundColor: "#263f3f",
            color: "white",
          }}
          placeholder="E-mail"
          placeholderTextColor={"grey"}
          onChangeText={(e) => {
            setEmail(e);
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

            if (password === confirmPass) {
              setBtnclicked(true);
              create();
            }

            navigator.navigate("LoginScreen1");
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Register</Text>
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
            navigator.navigate("LoginScreen");
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen1;

const styles = StyleSheet.create({});
