import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const navigator = useNavigation();
  const [regColor, setRegColor] = useState("#f48a85");
  const [logColor, setLogColor] = useState("#263f3f");

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/icon.png")}
        style={{
          width: width - 50,
          height: height / 3,
          borderRadius: 7,
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          backgroundColor: "#353535",
        }}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: width / 1.2,
          marginTop: -10,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Find your
        </Text>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
          }}
        >
          personal chauffeur.
        </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: width / 1.2,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Go to all the places you want just by a click!
        </Text>

        <View
          style={{
            flexDirection: "row",
            width: width / 1.3,
            height: 50,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 60,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={[
              {
                borderRadius: 5,
                width: 130,
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
              navigator.navigate("LoginScreen2");
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              {
                borderRadius: 5,
                width: 130,
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
              navigator.navigate("LoginScreen1");
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#353535",
  },
});
