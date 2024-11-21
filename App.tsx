import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./screens/Onboarding/Onboarding";
import { loadFonts } from "./config/fonts";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import SignIn from "./screens/Auth/SignIn/SignIn";
import SignUp from "./screens/Auth/SignUp/SignUp";
import HomeNavigation from "./navigations/HomeNavigation/HomeNavigation";
import { StatusBar } from "react-native";
import { Colors } from "./constants/Color";
import CreateTask from "./screens/HomeScreens/Create_Task/CreateTask";
import Coworkers from "./screens/HomeScreens/Create_Task/ListOfCoworkers/Coworkers";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };
    fetchFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.BLACK} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="HomeMain"
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="HomeMain" component={HomeNavigation} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
        <Stack.Screen
          name="Coworker"
          component={Coworkers}
          options={{
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
