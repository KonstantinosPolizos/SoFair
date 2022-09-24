import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 50,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MyProfile");
          }}
          style={{
            marginLeft: 5,
            width: 30,
            height: 30,
          }}
        >
          <FontAwesome name="chevron-left" size={22} color="#007aff" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 17,
            color: "#007aff",
            width: 70,
            height: 30,
            marginBottom: 3,
          }}
        >
          Settings
        </Text>
        <View style={{ width: 30 }} />
      </View>

      <View
        style={{
          alignSelf: "center",
          width: width,
          borderBottomColor: "grey",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />

      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <Text
          style={{
            color: "grey",
            marginHorizontal: 10,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Account
        </Text>

        <TouchableOpacity
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginHorizontal: 15,
            marginBottom: 30,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              width: width - 50,
              marginHorizontal: -5,
            }}
          >
            <MaterialCommunityIcons name="account" size={22} color="#007aff" />

            <Text
              style={{
                fontSize: 15,
                marginHorizontal: 10,
                marginBottom: 3,
                color: "black",
              }}
            >
              Account Manager
            </Text>
          </View>
          <AntDesign name="right" size={22} color="#007aff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginHorizontal: 15,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              width: width - 50,
              marginHorizontal: -5,
            }}
          >
            <AntDesign name="creditcard" size={22} color="#007aff" />

            <Text
              style={{
                fontSize: 15,
                marginHorizontal: 10,
                marginBottom: 3,
                color: "black",
              }}
            >
              Bank Balance
            </Text>
          </View>
          <AntDesign name="right" size={22} color="#007aff" />
        </TouchableOpacity>

        <View
          style={{
            alignSelf: "center",
            width: width - 20,
            marginBottom: 20,
            borderBottomColor: "grey",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <Text
          style={{
            color: "grey",
            marginHorizontal: 10,
            marginBottom: 20,
          }}
        >
          Appearance
        </Text>

        <TouchableOpacity
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginHorizontal: 15,
            marginBottom: 30,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              width: width - 50,
              marginHorizontal: -5,
            }}
          >
            <FontAwesome name="moon-o" size={22} color="#007aff" />

            <Text
              style={{
                fontSize: 15,
                marginHorizontal: 10,
                marginBottom: 2,
                color: "black",
              }}
            >
              Night Mode
            </Text>
          </View>
          <AntDesign name="right" size={22} color="#007aff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginHorizontal: 15,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              width: width - 50,
              marginHorizontal: -5,
            }}
          >
            <MaterialCommunityIcons
              name="format-letter-case-lower"
              size={22}
              color="#007aff"
            />

            <Text
              style={{
                fontSize: 15,
                marginHorizontal: 10,
                marginBottom: 3,
                color: "black",
              }}
            >
              Language
            </Text>
          </View>
          <AntDesign name="right" size={22} color="#007aff" />
        </TouchableOpacity>
        <View
          style={{
            alignSelf: "center",
            width: width - 20,
            marginBottom: 20,
            borderBottomColor: "grey",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

        <Text
          style={{
            color: "grey",
            marginHorizontal: 10,
            marginBottom: 20,
          }}
        >
          Memory
        </Text>

        <TouchableOpacity
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginHorizontal: 15,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              width: width - 100,
              marginHorizontal: -5,
            }}
          >
            <MaterialCommunityIcons name="cached" size={22} color="#007aff" />

            <Text
              style={{
                fontSize: 15,
                marginHorizontal: 10,
                marginBottom: 3,
                color: "black",
              }}
            >
              Clear Cache
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "#007aff",
              }}
            >
              125MB
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
