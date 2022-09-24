import { StyleSheet, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import ChooseLocation from "./ChooseLocation";

const Tab = createStackNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="map" component={Home} />
      <Tab.Screen name="Destination" component={ChooseLocation} />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
