import React from "react";

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
import { SwipeableMethods } from "react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable";
import { useSharedValue } from "react-native-reanimated";

import CalendarComp from "./CalendarComp";
import { TaskResponse } from "../../../api/types/models";
import AddTaskButton from "../../../component/AddTaskButton";
import EmptyTaskList from "../../../component/EmptyTaskList";
import TaskCard from "../../../component/TaskCard/TaskCard";
import { RootStackParamList } from "../../../types/RootStackParamList";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  tasks: TaskResponse[];
  setLastSelectedTask: (item: {
    id: number;
    ref: SwipeableMethods | null;
  }) => void;
  lastSelectedTask: { id: number; ref: SwipeableMethods | null };
  onDelete: (id: number) => void;
  onModify: (id: number) => void;
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
          style={[styles.addTaskContainer, { top: width < 380 ? 310 : 470 }]}
        >
          <AddTaskButton navigation={props.navigation} />
        </View>

        <FlatList
          data={props.tasks}
          keyExtractor={(item) => item?.id?.toString()!}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={({ viewableItems: vItems }) => {
            viewableItems.value = vItems;
          }}
          ListEmptyComponent={() => {
            return <EmptyTaskList />;
          }}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              navigation={props.navigation}
              item={item.id}
              viewableItems={viewableItems}
              setLastSelectedTask={props.setLastSelectedTask}
              lastSelectedTask={props.lastSelectedTask}
              onDelete={props.onDelete}
              onModify={props.onModify}
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
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    right: 10,
  },
});
