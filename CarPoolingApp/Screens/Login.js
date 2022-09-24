import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import LoginScreen1 from "./LoginScreen1";
import LoginScreen2 from "./LoginScreen2";
import Main from "./Main";

const Stack = createStackNavigator();

export default function Login() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="LoginScreen1" component={LoginScreen1} />
      <Stack.Screen name="LoginScreen2" component={LoginScreen2} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
}
