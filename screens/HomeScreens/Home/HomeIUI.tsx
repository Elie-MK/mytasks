import React from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { SwipeableMethods } from "react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable";
import { useSharedValue } from "react-native-reanimated";

import HeaderHome from "./HeaderHome";
import HomeSkeletonUI from "./HomeSkeletonUI";
import { TaskResponse, UserResponse } from "../../../api/types/models";
import AddTaskButton from "../../../component/AddTaskButton";
import CategoryList from "../../../component/Category/CategoryList";
import EmptyTaskList from "../../../component/EmptyTaskList";
import TaskCard from "../../../component/TaskCard/TaskCard";
import { RootStackParamList } from "../../../types/RootStackParamList";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  tasks: TaskResponse[];
  isFetchingData: boolean;
  onRefresh: () => void;
  user?: UserResponse;
  setLastSelectedTask: (item: {
    id: number;
    ref: SwipeableMethods | null;
  }) => void;
  lastSelectedTask: { id: number; ref: SwipeableMethods | null };
  onDelete: (id: number) => void;
  onModify: (id: number) => void;
};

const HomeUI = (props: Props) => {
  const width = Dimensions.get("window").width;

  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderHome user={props.user} tasks={props.tasks} />

        <View style={styles.todayTaskContainer}>
          <Text style={styles.todayTaskText}>Today tasks</Text>
        </View>
      </View>

      {props.isFetchingData && <HomeSkeletonUI />}

      {!props.isFetchingData && (
        <>
          <View style={styles.categoryContainer}>
            <CategoryList tasks={props.tasks} />
          </View>

          <View style={styles.bodyContainer}>
            <View
              style={[
                styles.addTaskContainer,
                { top: width < 380 ? 270 : 420 },
              ]}
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
              ListEmptyComponent={() => {
                return <EmptyTaskList />;
              }}
              refreshControl={
                <RefreshControl
                  refreshing={props.isFetchingData}
                  onRefresh={props.onRefresh}
                  progressBackgroundColor={"black"}
                />
              }
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: 20,
  },
  todayTaskContainer: {
    marginTop: 20,
  },
  todayTaskText: {
    fontSize: 18,
    fontFamily: "Roboto-bold",
  },
  categoryContainer: {
    marginTop: 10,
    paddingBottom: 10,
  },
  bodyContainer: {
    marginHorizontal: 20,
    flex: 1,
  },
  addTaskContainer: {
    position: "absolute",
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    right: 10,
  },
});
