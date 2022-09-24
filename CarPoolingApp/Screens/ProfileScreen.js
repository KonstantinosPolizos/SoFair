import { StyleSheet, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyProfileScreen from "./MyProfileScreen";

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = () => {
  return (
    <Tab.Navigator style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
      <Tab.Screen name="Profile" component={MyProfileScreen} />
    </Tab.Navigator>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
