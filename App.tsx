import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { loadFonts } from "./config/fonts";
import HomeNavigation from "./navigations/HomeNavigation/HomeNavigation";
import SignIn from "./screens/Auth/SignIn/SignIn";
import SignUp from "./screens/Auth/SignUp/SignUp";
import CreateTask from "./screens/HomeScreens/Create_Task/CreateTask";
import Coworkers from "./screens/HomeScreens/Create_Task/ListOfCoworkers/Coworkers";
import ViewTaskDetail from "./screens/HomeScreens/ViewTaskDetail/ViewTaskDetail";
import Onboarding from "./screens/Onboarding/Onboarding";
import { store } from "./store/store";
import { RootStackParamList } from "./types/RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
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
            <Stack.Screen
              options={{}}
              name="TaskDetail"
              component={ViewTaskDetail}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
