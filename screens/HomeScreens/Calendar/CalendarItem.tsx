import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import React from "react";
import CalendarComp from "./CalendarComp";
import AddTaskButton from "../../../component/AddTaskButton";
import { useSharedValue } from "react-native-reanimated";
import TaskCard from "../../../component/TaskCard/TaskCard";
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const CalendarItem = (props: Props) => {
  const data = new Array(50).fill(0).map((_, index) => ({ id: index }));
  const width = Dimensions.get("window").width;

  const viewableItems = useSharedValue<ViewToken[]>([]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.calendarTextContainer}>
        <Text style={styles.calendarTitle}>Calendar</Text>
      </View>
      <CalendarComp />

      <View style={styles.bodyContainer}>
        <View
          style={[styles.addTaskContainer, { top: width < 380 ? 270 : 470 }]}
        >
          <AddTaskButton navigation={props.navigation} />
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={({ viewableItems: vItems }) => {
            viewableItems.value = vItems;
          }}
          renderItem={({ item }) => (
            <TaskCard item={item} viewableItems={viewableItems} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default CalendarItem;

const styles = StyleSheet.create({
  calendarTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  calendarTitle: {
    fontFamily: "Roboto-bold",
    fontSize: 24,
    marginBottom: 10,
  },
  bodyContainer: {
    marginHorizontal: 20,
    flex: 1,
  },
  addTaskContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
