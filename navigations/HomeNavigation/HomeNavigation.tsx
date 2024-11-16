import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/HomeScreens/Home/Home";
import { Colors } from "../../constants/Color";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Calendar from "../../screens/HomeScreens/Calendar/Calendar";
import Statistics from "../../screens/HomeScreens/Statistics/Statistics";
import Profile from "../../screens/HomeScreens/Profile/Profile";
import { handleHaptics } from "../../config/haptics";

export default function HomeNavigation() {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let IconComponent:
            | typeof MaterialIcons
            | typeof MaterialCommunityIcons;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              IconComponent = MaterialCommunityIcons;
              break;
            case "Calendar":
              iconName = focused ? "calendar" : "calendar-outline";
              IconComponent = MaterialCommunityIcons;
              break;
            case "Statistics":
              iconName = focused ? "insert-chart" : "insert-chart-outlined";
              IconComponent = MaterialIcons;
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              IconComponent = MaterialIcons;
              break;
            default:
              throw new Error(`Unhandled route: ${route.name}`);
          }

          return (
            <IconComponent
              name={iconName as any}
              size={size}
              color={focused ? Colors.BLUE : Colors.GRAY}
            />
          );
        },
      })}
      sceneContainerStyle={{ backgroundColor: Colors.WHITE }}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Calendar" component={Calendar} />
      <Tabs.Screen name="Statistics" component={Statistics} />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
}
