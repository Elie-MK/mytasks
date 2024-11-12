import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export const loadFonts = async (): Promise<void> => {
  await Font.loadAsync({
    "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });
  SplashScreen.preventAutoHideAsync();
};
