import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeNavigation from "./HomeNavigation/HomeNavigation";
import SignIn from "../screens/Auth/SignIn/SignIn";
import SignUp from "../screens/Auth/SignUp/SignUp";
import CreateTask from "../screens/HomeScreens/Create_Task/CreateTask";
import Coworkers from "../screens/HomeScreens/Create_Task/ListOfCoworkers/Coworkers";
import ViewTaskDetail from "../screens/HomeScreens/ViewTaskDetail/ViewTaskDetail";
import Onboarding from "../screens/Onboarding/Onboarding";
import { RootStackParamList } from "../types/RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainAppNavigation = () => {
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | undefined
  >(undefined);

  useEffect(() => {
    const checkOnboarded = async () => {
      const onboarded = await AsyncStorage.getItem("onboarded");
      const token = await AsyncStorage.getItem("token");
      if (token && onboarded) {
        setInitialRoute("HomeMain");
      } else if (onboarded && !token) {
        setInitialRoute("SignIn");
      } else {
        setInitialRoute("Onboarding");
      }
    };

    checkOnboarded();
  }, []);

  if (initialRoute === undefined) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRoute}
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
      <Stack.Screen name="TaskDetail" component={ViewTaskDetail} />
    </Stack.Navigator>
  );
};

export default MainAppNavigation;
