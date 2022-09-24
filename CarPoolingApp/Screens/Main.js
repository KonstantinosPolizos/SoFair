import { StyleSheet } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./HomeScreen";
import Notifications from "./Notifications";
import MyProfile from "./MyProfile";

const Tab = createMaterialBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "#263f3f" }}
      activeColor="#f48a85"
    >
      <Tab.Screen
        component={HomeScreen}
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-map-marker"
              color={color}
              size={27}
            />
          ),
        }}
      />

      <Tab.Screen
        component={Notifications}
        name="Notidications"
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        component={MyProfile}
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
