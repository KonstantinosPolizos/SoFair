import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Screens/Login";
import { LogBox } from "react-native";
import { StyleSheet } from "react-native";

export default function App() {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
    "MapViewDirections Error: Error on GMAPS route request: ZERO_RESULTS",
    "MapViewDirections Error: Error on GMAPS route request: NOT_FOUND",
  ]);

  LogBox.ignoreAllLogs(); //Hide all warning notifications on front-end

  return (
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
