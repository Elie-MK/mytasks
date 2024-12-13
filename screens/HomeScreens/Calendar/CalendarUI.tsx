import React from "react";

import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";

import CalendarComp from "./CalendarComp";
import AddTaskButton from "../../../component/AddTaskButton";
import TaskCard from "../../../component/TaskCard/TaskCard";
import { ITask } from "../../../interfaces/ITask";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  tasks: ITask[];
};
const width = Dimensions.get("window").width;

const CalendarUI = (props: Props) => {
  const viewableItems = useSharedValue<ViewToken[]>([]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.calendarTextContainer}>
        <Text style={styles.calendarTitle}>Calendar</Text>
      </View>
      <CalendarComp />

      <View style={styles.bodyContainer}>
        <View
          style={[styles.addTaskContainer, { top: width < 380 ? 310 : 510 }]}
        >
          <AddTaskButton navigation={props.navigation} />
        </View>

        <FlatList
          data={props.tasks}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={({ viewableItems: vItems }) => {
            viewableItems.value = vItems;
          }}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              navigation={props.navigation}
              item={item}
              viewableItems={viewableItems}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default CalendarUI;

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
    flex: width < 380 ? 0.7 : 1.3,
  },
  addTaskContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
