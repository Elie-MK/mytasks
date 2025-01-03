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

import HeaderHome from "./HeaderHome";
import HomeSkeletonUI from "./HomeSkeletonUI";
import { TaskResponse } from "../../../api/types/models";
import AddTaskButton from "../../../component/AddTaskButton";
import CategoryList from "../../../component/Category/CategoryList";
import EmptyTaskList from "../../../component/EmptyTaskList";
import TaskCard from "../../../component/TaskCard/TaskCard";

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  tasks: TaskResponse[];
  isFetchingData?: boolean;
};

const HomeUI = (props: Props) => {
  const width = Dimensions.get("window").width;

  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderHome tasks={props.tasks} />

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
                />
              )}
              ListEmptyComponent={() => {
                return <EmptyTaskList />;
              }}
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
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
